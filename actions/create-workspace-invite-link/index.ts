"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { GenerateWorkspaceInviteLink } from "./schema";
import { InputType, ReturnType } from "./types";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { createInviteToken, createWorkspaceInviteToken } from "@/lib/token";

const handler = async (data: InputType): Promise<ReturnType> => {
  try {
    const user = await currentUser();
    if (!user || !user.workspaceId) {
      return {
        error: "unauthorized",
      };
    }
    const { workspaceId } = data;
    const board = await db.workspace.findUnique({
      where: {
        id: workspaceId,
      },
    });
    if (!board) {
      return {
        error: "No workspace found",
      };
    }

    // Check if an invite token already exists
    const existingInviteToken = await db.workspaceInviteToken.findFirst({
      where: {
        workspaceId,
      },
    });

    if (existingInviteToken) {
      return {
        data: `${process.env.NEXT_PUBLIC_APP_URL}/invite/w/${existingInviteToken.token}`,
      };
    }

    // Create new token if it doesn't exist
    const newInviteToken = await createWorkspaceInviteToken(workspaceId);
    if (!newInviteToken) {
      return {
        error: "error creating invite link",
      };
    }
    return {
      data: `${process.env.NEXT_PUBLIC_APP_URL}/invite/w/${newInviteToken}`,
    };
  } catch (error) {
    return {
      error: "Error creating invite link",
    };
  }
};

export const generateWorkspaceInviteLink = createSafeAction(
  GenerateWorkspaceInviteLink,
  handler
);
