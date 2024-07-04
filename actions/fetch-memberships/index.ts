"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { FetchWorkspaceList } from "./schema";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return {
        error: "unauthorized",
      };
    }

    const userId = user.id;
    const workspaces = await db.workspace.findMany({
      where: {
        OR: [
          { members: { some: { userId } } }, // when user is a workspace member
          { boards: { some: { boardMemberships: { some: { userId } } } } }, // when user is not a workspace member but a member of a board
        ],
      },
    });
    if (!workspaces) {
      return {
        error: "no workspaces",
      };
    }
    return {
      data: workspaces,
    };
  } catch (error) {
    return {
      error: "Unable to update the workspace to the session",
    };
  }
};

export const fetchWorkspacelist = createSafeAction(FetchWorkspaceList, handler);
