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
  let board;
  try {
    board = await db.board.create({
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
    await db.boardMembership.create({
      data: {
        userId: user.id,
        boardId: board.id,
        role: BoardRole.ADMIN,
      },
    });

    await createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "Failed to create",
    };
  }
  revalidatePath(`/b/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);
