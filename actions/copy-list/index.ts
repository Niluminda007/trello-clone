"use server";

import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { CopyList } from "./schema";
import { db } from "@/lib/db";
import { createAuditLog } from "@/lib/create-audit-log";
import { currentUser } from "@/lib/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser();
  if (!user || !user.workspaceId) {
    return {
      error: "unauthorized!",
    };
  }
  const { id, boardId } = data;

  try {
    const listToCopy = await db.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          workspaceId: user.workspaceId,
        },
      },
      include: {
        cards: {
          include: {
            cardLabels: true,
          },
        },
      },
    });

    if (!listToCopy) {
      return {
        error: "List not found",
      };
    }

    const lastList = await db.list.findFirst({
      where: {
        boardId,
      },
      orderBy: { order: "desc" },
      select: {
        order: true,
      },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    // Create the new list and its cards
    const newList = await db.list.create({
      data: {
        boardId: listToCopy.boardId,
        title: `${listToCopy.title} - Copy`,
        order: newOrder,
        cards: {
          createMany: {
            data: listToCopy.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order,
            })),
          },
        },
      },
    });

    // Find the newly created cards to map labels
    const newCards = await db.card.findMany({
      where: {
        listId: newList.id,
      },
    });

    // Create card labels for the new cards
    const cardLabelTransactions = listToCopy.cards.flatMap((oldCard, index) =>
      oldCard.cardLabels.map((cardLabel) =>
        db.cardLabel.create({
          data: {
            cardId: newCards[index].id,
            labelId: cardLabel.labelId,
          },
        })
      )
    );

    await db.$transaction(cardLabelTransactions);

    // Create an audit log entry
    await createAuditLog({
      entityId: newList.id,
      entityTitle: newList.title,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.CREATE,
    });

    // Revalidate the path
    revalidatePath(`/board/${boardId}`);

    return {
      data: newList,
    };
  } catch (error) {
    console.error(error); // Logging the error for debugging purposes
    return {
      error: "Error copying list",
    };
  }
};

export const copyList = createSafeAction(CopyList, handler);
