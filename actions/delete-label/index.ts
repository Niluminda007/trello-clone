"use server";

import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { DeleteLabel } from "./schema";
import { db } from "@/lib/db";
import { createAuditLog } from "@/lib/create-audit-log";
import { currentUser } from "@/lib/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser();
  if (!user || !user.workspaceId) {
    return {
      error: "unauthorized",
    };
  }
  try {
    const { labelId, boardId } = data;
    const deletedLabel = await db.label.delete({
      where: {
        id: labelId,
      },
    });

    await createAuditLog({
      entityId: labelId,
      entityTitle: deletedLabel.title || "",
      entityType: ENTITY_TYPE.LABEL,
      action: ACTION.DELETE,
    });
    revalidatePath(`/b/${boardId}`);
    return {
      data: deletedLabel,
    };
  } catch (error) {
    return {
      error: "error deleting label",
    };
  }
};

export const deleteLabel = createSafeAction(DeleteLabel, handler);
