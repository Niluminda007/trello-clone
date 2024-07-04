"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { UpdateListOrder } from "./schema";
import { revalidatePath } from "next/cache";
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
  let lists;
  try {
    const transaction = items.map((list) =>
      db.list.update({
        where: {
          id: list.id,
          board: {
            workspaceId: user.workspaceId,
          },
        },
        data: {
          order: list.order,
        },
      })
    );
    lists = await db.$transaction(transaction);
  } catch (error) {
    return {
      error: "Faield to reorder",
    };
  }
  revalidatePath(`/b/${boardId}`);
  return {
    data: lists,
  };
};

export const updateListOrder = createSafeAction(UpdateListOrder, handler);
