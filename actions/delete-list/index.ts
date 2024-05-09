"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { DeleteList } from "./schema";
import { db } from "@/lib/db";
import { createAuditLog } from "@/lib/create-audit-log";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { orgId, userId } = auth();
  if (!orgId || !userId) {
    return {
      error: "Unauthorized!!",
    };
  }
  const { id, boardId } = data;
  let list;
  try {
    list = await db.list.delete({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
    });
    await createAuditLog({
      entityId: list.id,
      entityTitle: list.title,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.DELETE,
    });
  } catch (error) {
    return {
      error: "Failed to delete the list",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return {
    data: list,
  };
};

export const deleteList = createSafeAction(DeleteList, handler);
