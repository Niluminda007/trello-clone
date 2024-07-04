"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas/auth-schemas";
import { getUserByEmail } from "@/data/user";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { BoardRole, WorkspaceRole } from "@prisma/client";
import { createWorkspaceMembershipForInvitedUser } from "@/lib/workspace";
import { createBoardMembershipForInvitedUser } from "@/lib/boards";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "invalid fields!",
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist" };
  }
  let redirectUrl = `/select-workspace`;
  if (existingUser.activeWorkspace) {
    redirectUrl = `/w/${existingUser.activeWorkspace}`;
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    // handle invited users to the baord
    const boardId = cookies().get("invited-board-id")?.value;
    if (boardId) {
      // const existingMember = await db.boardMembership.findUnique({
      //   where: {
      //     userId_boardId: {
      //       boardId,
      //       userId: existingUser.id,
      //     },
      //   },
      // });
      // if (!existingMember) {
      //   // create a membership for the user
      //   const membership = await db.boardMembership.create({
      //     data: {
      //       userId: existingUser.id,
      //       boardId: boardId,
      //       role: BoardRole.MEMBER,
      //     },
      //     include: {
      //       board: true,
      //     },
      //   });
      //   // add the user active workspace to the invite board workspace
      //   await db.user.update({
      //     where: {
      //       id: existingUser.id,
      //     },
      //     data: {
      //       activeWorkspace: membership.board.workspaceId,
      //     },
      //   });
      // }
      // //change the redirect url to the invite board url
      // redirectUrl = `/b/${boardId}`;
      // // Remove the cookie after processing the invitation
      // cookies().delete("invited-board-id");

      await createBoardMembershipForInvitedUser(boardId, existingUser.id);

      redirectUrl = `/b/${boardId}`;
    }

    // handle invited users to the workspace
    const workspaceId = cookies().get("invited-workspace-id")?.value;
    if (workspaceId) {
      createWorkspaceMembershipForInvitedUser(workspaceId, existingUser.id);
      redirectUrl = `/w/${workspaceId}`;
    }

    return {
      success: true,
      url: redirectUrl,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};
