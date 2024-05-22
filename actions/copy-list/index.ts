"use server";

import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { CopyList } from "./schema";
import { db } from "@/lib/db";
import { createAuditLog } from "@/lib/create-audit-log";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { orgId, userId } = auth();
  if (!orgId || !userId) {
    return {
      error: "Unautorized!",
    };
  }
  const { id, boardId } = data;
  let list;
  try {
    const listToCopy = await db.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      include: {
        cards: true,
      },
    });
    if (!listToCopy) {
      return {
        error: "List not found",
      };
    }
    const lastList = await db.list.findFirst({
      where: {
        boardId,
      },
      orderBy: { order: "desc" },
      select: {
        order: true,
      },
    });
    const newOrder = lastList ? lastList.order + 1 : 1;
    list = await db.list.create({
      data: {
        boardId: listToCopy.boardId,
        title: `${listToCopy.title} - Copy`,
        order: newOrder,
        cards: {
          createMany: {
            data: listToCopy.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order,
            })),
          },
        },
      },
      include: {
        cards: true,
      },
    });
    await createAuditLog({
      entityId: list.id,
      entityTitle: list.title,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "Error Copy",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return {
    data: list,
  };
};

export const copyList = createSafeAction(CopyList, handler);