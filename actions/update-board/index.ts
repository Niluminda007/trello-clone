"use server";

import { revalidatePath } from "next/cache";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateBoard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { currentUser } from "@/lib/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser();
  if (!user || !user.workspaceId) {
    return {
      error: "unauthorized",
    };
  }
  const { title, id } = data;
  let board;
  try {
    board = await db.board.update({
      where: {
        id,
        workspaceId: user.workspaceId,
      },
      data: {
        title,
      },
    });
    await createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.UPDATE,
    });
  } catch (error) {
    return {
      error: "Failed to update.",
    };
  }
  revalidatePath(`/b/${id}`);
  return {
    data: board,
  };
};

export const updateBoard = createSafeAction(UpdateBoard, handler);
