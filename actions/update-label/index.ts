"use server";

import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { UpdateLabel } from "./schema";
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
    const { labelId, values, boardId } = data;
    if (!values) {
      return {
        error: "no values provided",
      };
    }
    const updatedLabel = await db.label.update({
      data: values,
      where: {
        id: labelId,
      },
    });
    await createAuditLog({
      entityId: labelId,
      entityTitle: updatedLabel.title || "",
      entityType: ENTITY_TYPE.LABEL,
      action: ACTION.UPDATE,
    });
    revalidatePath(`/b/${boardId}`);
    return {
      data: updatedLabel,
    };
  } catch (error) {
    return {
      error: "error updating label",
    };
  }
};

export const updateLabel = createSafeAction(UpdateLabel, handler);
