"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteInviteLink } from "./schema";
import { InputType, ReturnType } from "./types";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

const handler = async (data: InputType): Promise<ReturnType> => {
  try {
    const user = await currentUser();
    if (!user || !user.workspaceId) {
      return {
        error: "unauthorized",
      };
    }
    const { boardId, token } = data;
    const board = await db.board.findUnique({
      where: {
        id: boardId,
      },
    });
    if (!board) {
      return {
        error: "No board found",
      };
    }
    await db.inviteToken.delete({
      where: {
        boardId,
        token,
      },
    });

    return {
      data: "invite link deleted successfully",
    };
  } catch (error) {
    return {
      error: "Error deleting invite link",
    };
  }
};

export const deleteInviteLink = createSafeAction(DeleteInviteLink, handler);
