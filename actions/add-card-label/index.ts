"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { AddCardLabel } from "./schema";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser();
  if (!user || !user.workspaceId) {
    return {
      error: "unauthorized!!!",
    };
  }
  try {
    const { cardId, labelId, boardId } = data;

    const existingCardLabel = await db.cardLabel.findUnique({
      where: {
        cardId_labelId: {
          cardId,
          labelId,
        },
      },
    });
    if (existingCardLabel) {
      await db.cardLabel.delete({
        where: {
          cardId_labelId: {
            cardId,
            labelId,
          },
        },
      });
    } else {
      await db.cardLabel.create({
        data: {
          cardId,
          labelId,
        },
      });
    }

    revalidatePath(`/b/${boardId}`);
    return {
      data: "success",
    };
  } catch (error) {
    return {
      error: "failed to add label to the card",
    };
  }
};

export const addCardLabel = createSafeAction(AddCardLabel, handler);
