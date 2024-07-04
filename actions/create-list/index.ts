"use server";

import { revalidatePath } from "next/cache";

import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { CreateList } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { currentUser } from "@/lib/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser();
  if (!user || !user.workspaceId) {
    return {
      error: "unauthorized!!!",
    };
  }
  const { boardId, title } = data;
  let list;
  try {
    const board = await db.board.findUnique({
      where: {
        id: boardId,
        workspaceId: user.workspaceId,
      },
    });
    if (!board) {
      return {
        error: "Board not found",
      };
    }
    const lastList = await db.list.findFirst({
      where: { boardId: boardId },
      orderBy: { order: "desc" },
      select: { order: true },
    });
    const newOrder = lastList ? lastList.order + 1 : 1;
    list = await db.list.create({
      data: {
        title,
        boardId: boardId,
        order: newOrder,
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
      error: "Failed to Create List",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const createList = createSafeAction(CreateList, handler);
