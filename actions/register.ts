"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas/auth-schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { updateBoardGuestToBoardMember } from "@/lib/members";
import { getRandomColor } from "@/lib/utils";

import {
  createWorkspaceMembershipForInvitedUser,
  promoteGuestWorkspaceMemberToMember,
} from "@/lib/workspace";
import { signIn } from "@/auth";
import { cookies } from "next/headers";
import { createBoardMembershipForInvitedUser } from "@/lib/boards";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  try {
    const validatedFields = RegisterSchema.safeParse(values);
    if (!validatedFields.success) {
      return {
        error: "invalid fields!",
      };
    }
    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return {
        error: "Email already in use",
      };
    }

    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        accentColor: getRandomColor(),
      },
    });
    let redirectUrl = "/select-workspace";
    if (newUser && newUser.email) {
      // if the user trying to register is a guest member of a board
      await updateBoardGuestToBoardMember(email, newUser.id);

      // check if the user trying to register is a guest workspace member if so create all board memberships for existing boards
      await promoteGuestWorkspaceMemberToMember(newUser.id, newUser.email);
      // // handle invited users to the baord
      // const boardId = cookies().get("invited-board-id")?.value;
      // if (boardId) {
      //   await createBoardMembershipForInvitedUser(boardId, newUser.id);
      //   redirectUrl = `/b/${boardId}`;
      // }

      // // handle invited users to the workspace
      // const workspaceId = cookies().get("invited-workspace-id")?.value;
      // if (workspaceId) {
      //   createWorkspaceMembershipForInvitedUser(workspaceId, newUser.id);
      //   redirectUrl = `/w/${workspaceId}`;
      // }
    }

    await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    return { success: "Account created Successfully!", url: redirectUrl };
  } catch (error) {
    return {
      error: "Unable to register the user",
    };
  }
};
