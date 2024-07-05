import { Board, BoardMembership, BoardRole } from "@prisma/client";
import { db } from "./db";
import { updateDbUserProperties } from "./user";
import { cookies } from "next/headers";

export const getGuestBoardMembershipByEmail = async (
  email: string | null | undefined
) => {
  try {
    if (!email) {
      return null;
    }
    return await db.boardGuestMembership.findFirst({
      where: {
        email,
      },
    });
  } catch (error) {
    return null;
  }
};

export const createBoardMembershipForUser = async (
  boardId: string,
  userId: string,
  role: BoardRole = "MEMBER"
): Promise<(BoardMembership & { board: Board }) | null> => {
  try {
    return await db.boardMembership.create({
      data: {
        boardId: boardId,
        userId: userId,
        role: role,
      },
      include: {
        board: true,
      },
    });
  } catch (error) {
    return null;
  }
};

export const createBoardMembershipForInvitedUser = async (
  boardId: string,
  userId: string
) => {
  try {
    const membership = await createBoardMembershipForUser(boardId, userId);
    if (membership) {
      await updateDbUserProperties(userId, {
        activeWorkspace: membership.board.workspaceId,
      });
      cookies().delete("invited-board-id");
    }
  } catch (error) {
    return;
  }
};

export const promoteGuestBoardMemberToMember = async (
  email: string | null,
  userId: string
) => {
  try {
    const guestMembership = await getGuestBoardMembershipByEmail(email);
    if (!guestMembership) {
      return;
    }

    await createBoardMembershipForUser(
      guestMembership.boardId,
      userId,
      guestMembership.prospectRole
    );

    await updateDbUserProperties(userId, {
      accentColor: guestMembership.accentColor,
    });
    await db.boardGuestMembership.delete({
      where: {
        id: guestMembership.id,
      },
    });
    return;
  } catch (error) {
    return;
  }
};
