"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateList } from "./schema";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { currentUser } from "@/lib/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser();
  if (!user || !user.workspaceId) {
    return {
      error: "!unauthorized",
    };
  }
  const { title, id, boardId } = data;
  let list;
  try {
    list = await db.list.update({
      where: {
        id,
        boardId,
        board: {
          workspaceId: user.workspaceId,
        },
      },
      data: {
        title,
      },
    });
    await createAuditLog({
      entityId: list.id,
      entityTitle: list.title,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.UPDATE,
    });
  } catch (error) {
    return {
      error: "Failed to Update List",
    };
  }
  revalidatePath(`/b/${boardId}`);
  return {
    data: list,
  };
};

export const updateList = createSafeAction(UpdateList, handler);
