"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ACTION, BoardRole, ENTITY_TYPE } from "@prisma/client";

import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { DeleteBoard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { currentUser } from "@/lib/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser();
  if (!user || !user.id || !user.workspaceId) {
    return {
      error: "unauthorized",
    };
  }

  const { id } = data;
  let board;

  try {
    const membership = await db.boardMembership.findUnique({
      where: {
        userId_boardId: {
          userId: user.id,
          boardId: id,
        },
      },
    });
    if (!membership) {
      return {
        error: "User is not part of the board",
      };
    }
    if (membership.role !== BoardRole.ADMIN) {
      return {
        error: "Only Admin's can delete the board",
      };
    }
    board = await db.board.delete({
      where: {
        id,
        workspaceId: user.workspaceId,
      },
    });

    await createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.DELETE,
    });
  } catch (error) {
    return {
      error: "Failed to delete the Board",
    };
  }
  revalidatePath(`/w/${user.workspaceId}`);
  redirect(`/w/${user.workspaceId}`);
};

export const deleteBoard = createSafeAction(DeleteBoard, handler);
