import { ENTITY_TYPE, ACTION } from "@prisma/client";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { currentUser } from "./auth";

interface Props {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
}

export const createAuditLog = async (props: Props) => {
  try {
    const user = await currentUser();

    if (!user || !user.id || !user.workspaceId) {
      throw new Error("User not found");
    }
    const { entityId, entityType, entityTitle, action } = props;
    await db.auditLog.create({
      data: {
        workspaceId: user.workspaceId,
        entityId,
        entityTitle,
        entityType,
        action,
        userId: user.id,
        userImage: "" /*user?.imageUrl*/,
        userName: user?.name!,
      },
    });
  } catch (error) {
    console.log("[AUDIT_LOG_ERROR]", error);
  }
};
