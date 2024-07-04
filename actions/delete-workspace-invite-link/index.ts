"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteWorkspaceInviteLink } from "./schema";
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
    const { workspaceId, token } = data;
    const workspace = await db.workspace.findUnique({
      where: {
        id: workspaceId,
      },
    });
    if (!workspace) {
      return {
        error: "No workspace found",
      };
    }
    await db.workspaceInviteToken.delete({
      where: {
        workspaceId,
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

export const deleteWorkspaceInviteLink = createSafeAction(
  DeleteWorkspaceInviteLink,
  handler
);
