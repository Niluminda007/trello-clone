import { auth } from "@/auth";
import { db } from "./db";
import { BoardRole, Membership, User, WorkspaceRole } from "@prisma/client";
import { updateDbUserProperties } from "./user";
import { cookies } from "next/headers";

export const getUserWorkspaces = async () => {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return null;
    }
    const userId = session.user.id;

    const workspaces = await db.workspace.findMany({
      where: {
        OR: [
          { members: { some: { userId } } },
          { boards: { some: { boardMemberships: { some: { userId } } } } },
        ],
      },
    });

    return workspaces;
  } catch (error) {
    console.error("Error fetching workspaces:", error);

    return null;
  }
};

export const createWorkspaceMembershipForUser = async (
  userId: string,
  workspaceId: string,
  role: WorkspaceRole = "MEMBER"
): Promise<(Membership & { user: User }) | undefined> => {
  try {
    console.log(role);
    return await db.membership.create({
      data: {
        userId: userId,
        workspaceId,
        role,
      },
      include: {
        user: true,
      },
    });
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const addWorkspaceMemberToAllBoards = async (
  userId: string,
  workspaceId: string,
  role: BoardRole = "MEMBER"
) => {
  try {
    const membership = await db.membership.findFirst({
      where: {
        workspaceId,
        userId,
      },
    });
    if (!membership) {
      return;
    }
    const boards = await db.board.findMany({
      where: {
        workspaceId,
      },
    });
    if (!boards.length) {
      return;
    }
    const transactions = boards.map((board) =>
      db.boardMembership.create({
        data: {
          boardId: board.id,
          userId: userId,
          role: role,
        },
      })
    );
    await db.$transaction(transactions);
    return;
  } catch (error) {
    return;
  }
};

export const promoteGuestWorkspaceMemberToMember = async (
  userId: string,
  email: string | null | undefined
) => {
  try {
    if (!userId || !email) {
      return;
    }
    const guestMembership = await getGuestWorkspaceMembershipByEmail(email);
    if (!guestMembership) {
      return;
    }
    const membership = await createWorkspaceMembershipForUser(
      userId,
      guestMembership.workspaceId,
      guestMembership.prospectRole
    );
    if (membership) {
      addWorkspaceMemberToAllBoards(userId, membership.workspaceId);
      await db.workspaceGuestMembership.delete({
        where: {
          id: guestMembership.id,
        },
      });
    }
  } catch (error) {
    return;
  }
};

export const getGuestWorkspaceMembershipByEmail = async (
  email: string | null | undefined
) => {
  try {
    if (!email) {
      return null;
    }
    return await db.workspaceGuestMembership.findFirst({
      where: {
        email,
      },
    });
  } catch (error) {
    return null;
  }
};

export const createWorkspaceMembershipForInvitedUser = async (
  workspaceId: string,
  userId: string
) => {
  try {
    const membership = await createWorkspaceMembershipForUser(
      userId,
      workspaceId
    );
    if (membership) {
      await updateDbUserProperties(userId, {
        activeWorkspace: membership.workspaceId,
      });
      await addWorkspaceMemberToAllBoards(userId, workspaceId);
      cookies().delete("invited-workspace-id");
    }
  } catch (error) {
    return;
  }
};
