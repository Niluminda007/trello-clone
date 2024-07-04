"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { UpdateCardOrder } from "./schema";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser();
  if (!user || !user.workspaceId) {
    return {
      error: "unauthorized",
    };
  }
  const { items, boardId } = data;
  let updatedCards;
  try {
    const transaction = items.map((card) =>
      db.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              workspaceId: user.workspaceId,
            },
          },
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      })
    );
    updatedCards = await db.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reorder",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return {
    data: updatedCards,
  };
};

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);
