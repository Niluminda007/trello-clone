"use server";

import { revalidatePath } from "next/cache";
import { ACTION, ENTITY_TYPE, WorkspaceRole } from "@prisma/client";
import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { LeaveWorkspace } from "./schema";
import { db } from "@/lib/db";
import { createAuditLog } from "@/lib/create-audit-log";
import { currentUser } from "@/lib/auth";

const leaveWorkspaceHandler = async (data: InputType): Promise<ReturnType> => {
  try {
    const user = await currentUser();
    if (!user || !user.id || !user.workspaceId) {
      return {
        error: "Unauthorized",
      };
    }

    const { workspaceId } = data;
    const membership = await db.membership.findUnique({
      where: {
        userId_workspaceId: {
          userId: user.id,
          workspaceId,
        },
      },
    });

    if (!membership) {
      return {
        error: "You must be a member to perform this action",
      };
    }

    if (membership.role === WorkspaceRole.ADMIN) {
      const workspace = await db.workspace.delete({
        where: {
          id: workspaceId,
        },
      });

      await createAuditLog({
        entityId: workspace.id,
        entityTitle: workspace.name,
        entityType: ENTITY_TYPE.WORKSPACE,
        action: ACTION.DELETE,
      });

      revalidatePath(`/w/${workspaceId}`);
      return {
        data: workspace,
      };
    } else {
      const revokedMembership = await db.membership.delete({
        where: {
          id: membership.id,
        },
        include: {
          workspace: true,
        },
      });

      await createAuditLog({
        entityId: workspaceId,
        entityTitle: revokedMembership.workspace.name,
        entityType: ENTITY_TYPE.WORKSPACE,
        action: ACTION.LEAVE,
      });

      revalidatePath(`/w/${workspaceId}/`);
      return {
        data: revokedMembership.workspace,
      };
    }
  } catch (error) {
    console.error("Error leaving workspace:", error);
    return {
      error: "Failed to leave the workspace",
    };
  }
};

export const leaveWorkspace = createSafeAction(
  LeaveWorkspace,
  leaveWorkspaceHandler
);
