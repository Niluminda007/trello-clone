"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { AddWorkspaceMember } from "./schema";
import { InputType, ReturnType } from "./types";
import { currentUser } from "@/lib/auth";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { getRandomColor } from "@/lib/utils";
import {
  addWorkspaceMemberToAllBoards,
  createWorkspaceMembershipForUser,
} from "@/lib/workspace";

const handler = async (data: InputType): Promise<ReturnType> => {
  try {
    const user = await currentUser();
    if (!user || !user.id || !user.workspaceId) {
      return {
        error: "Unauthorized: User is not authenticated",
      };
    }

    const { email, workspaceId, role } = data;

    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      // Create a guest membership for the workspace if the user is not registered in the platform
      const guestMembership = await db.workspaceGuestMembership.create({
        data: {
          email,
          workspaceId,
          accentColor: getRandomColor(),
          prospectRole: role,
        },
      });
      return {
        data: guestMembership.email,
      };
    }
    // create a workspace membership
    const membership = await createWorkspaceMembershipForUser(
      existingUser.id,
      workspaceId,
      role
    );
    if (!membership) {
      return {
        error: "Error adding member to the workspace",
      };
    }

    // add all exisiting boards to workspace member
    await addWorkspaceMemberToAllBoards(
      membership.userId,
      membership.workspaceId
    );
    const userNameOrEmail = membership.user.name || membership.user.email || "";

    return {
      data: userNameOrEmail,
    };
  } catch (error) {
    console.error("Error adding member to the workspace:", error);
    return {
      error: "Failed to add member to the workspace",
    };
  }
};

export const addWorkspaceMember = createSafeAction(AddWorkspaceMember, handler);
