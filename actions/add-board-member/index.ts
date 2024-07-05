"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { AddBoardMember } from "./schema";
import { InputType, ReturnType } from "./types";
import { currentUser } from "@/lib/auth";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { BoardRole, UserRole } from "@prisma/client";
import { getRandomColor } from "@/lib/utils";

const handler = async (data: InputType): Promise<ReturnType> => {
  try {
    const user = await currentUser();
    if (!user || !user.workspaceId) {
      return {
        error: "unauthorized!!!",
      };
    }

    const { email, boardId, role } = data;

    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      // create a guest membership for the board if the user is not registered in the platform
      const guestMembership = await db.boardGuestMembership.create({
        data: {
          email: email,
          boardId: boardId,
          accentColor: getRandomColor(),
          prospectRole: role,
        },
      });
      return {
        data: guestMembership.email,
      };
    }
    const boardMembership = await db.boardMembership.create({
      data: {
        userId: existingUser.id,
        boardId,
        role: role,
      },
      include: {
        user: true,
      },
    });
    return {
      data: boardMembership.user.name
        ? boardMembership.user.name
        : boardMembership.user.email
        ? boardMembership.user.email
        : "",
    };
  } catch (error) {
    return {
      error: "Error adding member to the board",
    };
  }
};

export const addBoardMember = createSafeAction(AddBoardMember, handler);
