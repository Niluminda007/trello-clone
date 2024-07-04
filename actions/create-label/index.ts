"use server";

import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { CreateLabel } from "./schema";
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
    const { title, color, cardId, boardId } = data;
    const label = await db.label.create({
      data: {
        title,
        color,
      },
    });
    await db.cardLabel.create({
      data: {
        labelId: label.id,
        cardId,
      },
    });
    await createAuditLog({
      entityId: cardId,
      entityTitle: title || "",
      entityType: ENTITY_TYPE.LABEL,
      action: ACTION.CREATE,
    });
    revalidatePath(`/b/${boardId}`);
    return {
      data: label,
    };
  } catch (error) {
    return {
      error: "error creating label",
    };
  }
};

export const createLabel = createSafeAction(CreateLabel, handler);
