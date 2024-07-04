"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { GenerateInviteLink } from "./schema";
import { InputType, ReturnType } from "./types";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { createInviteToken } from "@/lib/token";

const handler = async (data: InputType): Promise<ReturnType> => {
  try {
    const user = await currentUser();
    if (!user || !user.workspaceId) {
      return {
        error: "unauthorized",
      };
    }
    const { boardId } = data;
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

    // Check if an invite token already exists
    const existingInviteToken = await db.inviteToken.findFirst({
      where: {
        boardId,
      },
    });

    if (existingInviteToken) {
      return {
        data: `${process.env.NEXT_PUBLIC_APP_URL}/invite/b/${existingInviteToken.token}`,
      };
    }

    // Create new token if it doesn't exist
    const newInviteToken = await createInviteToken(boardId);
    if (!newInviteToken) {
      return {
        error: "error creating invite link",
      };
    }
    return {
      data: `${process.env.NEXT_PUBLIC_APP_URL}/invite/b/${newInviteToken}`,
    };
  } catch (error) {
    return {
      error: "Error creating invite link",
    };
  }
};

export const generateInviteLink = createSafeAction(GenerateInviteLink, handler);
