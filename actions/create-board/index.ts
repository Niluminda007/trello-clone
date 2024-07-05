"use server";

import { revalidatePath } from "next/cache";
import { ACTION, BoardRole, ENTITY_TYPE } from "@prisma/client";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { currentUser } from "@/lib/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser();
  if (!user || !user.id || !user.workspaceId) {
    return {
      error: "unauthorized",
    };
  }

  const { title, image } = data;
  const [imageID, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split("|");

  if (
    !imageID ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageLinkHTML ||
    !imageUserName
  ) {
    return {
      error: "Missing fields. Failed to create board.",
    };
  }

  try {
    const board = await db.board.create({
      data: {
        title,
        workspaceId: user.workspaceId,
        imageID,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHTML,
      },
    });
    if (!board) {
      return {
        error: "failed to create board",
      };
    }

    // Add the current user as an admin of the board
    const adminMembership = await db.boardMembership.create({
      data: {
        userId: user.id,
        boardId: board.id,
        role: BoardRole.ADMIN,
      },
    });

    // Add all workspace members as board members
    const workspaceMembers = await db.membership.findMany({
      where: {
        workspaceId: board.workspaceId,
        NOT: {
          userId: adminMembership.userId,
        },
      },
    });
    console.log(workspaceMembers);
    if (workspaceMembers.length > 0) {
      const transaction = workspaceMembers.map((member) =>
        db.boardMembership.create({
          data: {
            userId: member.userId,
            boardId: board.id,
            role: BoardRole.MEMBER,
          },
        })
      );
      await db.$transaction(transaction);
    }

    await createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
    });

    revalidatePath(`/b/${board.id}`);
    return { data: board };
  } catch (error) {
    console.error("Failed to create board:", error);
    return {
      error: "Failed to create",
    };
  }
};

export const createBoard = createSafeAction(CreateBoard, handler);
