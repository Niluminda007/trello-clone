import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import { getUserByID } from "@/data/user";
import { getAccountByUserId } from "@/data/account";
import { cookies } from "next/headers";
import { getRandomColor } from "./lib/utils";

import {
  createWorkspaceMembershipForInvitedUser,
  getGuestWorkspaceMembershipByEmail,
  promoteGuestWorkspaceMemberToMember,
} from "./lib/workspace";
import {
  createBoardMembershipForInvitedUser,
  getGuestBoardMembershipByEmail,
  promoteGuestBoardMemberToMember,
} from "./lib/boards";
import { updateDbUserProperties } from "./lib/user";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email!;
        session.user.isOAuth = token.isOAuth as boolean;
      }
      if (token.workspaceId) {
        session.user.workspaceId = token.workspaceId;
      }
      return session;
    },
    async jwt({ account, token, user }) {
      if (!token.sub) return token;
      const existingUser = await getUserByID(token.sub);
      if (!existingUser) return token;
      const existingAccount = await getAccountByUserId(existingUser.id);

      const isOAuthGuestWorkspace =
        !!existingAccount &&
        !!(await getGuestWorkspaceMembershipByEmail(existingUser.email));

      const isOAuthGuestBoard =
        !!existingAccount &&
        (await getGuestBoardMembershipByEmail(existingUser.email));

      const invitedBoardId = cookies().get("invited-board-id")?.value;
      const invitedWorkspaceId = cookies().get("invited-workspace-id")?.value;
      const isOAuthInvitedBoardUser = !!existingAccount && invitedBoardId;
      const isOAuthInvitedWorkspaceUser =
        !!existingAccount && invitedWorkspaceId;

      const isOAuthNoAccentColor =
        !!existingAccount && !existingUser.accentColor;

      // handling OAuth login for guest board members
      if (isOAuthGuestBoard) {
        await promoteGuestBoardMemberToMember(
          existingUser.email,
          existingUser.id
        );
      }

      // handling OAuth login for invited users to board
      if (isOAuthInvitedBoardUser) {
        await createBoardMembershipForInvitedUser(
          invitedBoardId,
          existingUser.id
        );
      }

      // handling OAuth login for invited users to worspace
      if (isOAuthInvitedWorkspaceUser) {
        await createWorkspaceMembershipForInvitedUser(
          invitedWorkspaceId,
          existingUser.id
        );
      }

      // set OAuth users accent color when logged in for the first time
      if (isOAuthNoAccentColor) {
        await updateDbUserProperties(existingUser.id, {
          accentColor: getRandomColor(),
        });
      }

      // handling OAuth login for guest workspace members
      if (isOAuthGuestWorkspace) {
        await promoteGuestWorkspaceMemberToMember(
          existingUser.id,
          existingUser.email
        );
      }

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      if (existingUser.activeWorkspace) {
        token.workspaceId = existingUser.activeWorkspace;
      }
      return { ...token, ...user };
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
