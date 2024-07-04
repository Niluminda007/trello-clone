"use server";

import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateWorkspace } from "./schema";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { currentUser } from "@/lib/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser();
  if (!user || !user.id || !user.workspaceId) {
    return {
      error: "Unauthorized",
    };
  }

  try {
    const { workspaceId, name, description } = data;

    if (!workspaceId || !name) {
      return {
        error: "Missing required fields",
      };
    }

    const updatedWorkspace = await db.workspace.update({
      where: {
        id: workspaceId,
      },
      data: {
        name,
        description,
      },
    });

    await createAuditLog({
      entityId: updatedWorkspace.id,
      entityTitle: updatedWorkspace.name,
      entityType: ENTITY_TYPE.WORKSPACE,
      action: ACTION.UPDATE,
    });

    revalidatePath(`/w/${workspaceId}/settings/profile`);

    return {
      data: updatedWorkspace,
    };
  } catch (error) {
    console.error("Failed to update workspace:", error);
    return {
      error: "Failed to update workspace",
    };
  }
};

export const updateWorkspace = createSafeAction(UpdateWorkspace, handler);
