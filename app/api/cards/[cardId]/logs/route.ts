import { auth } from "@clerk/nextjs/server";
import { AuditLog, ENTITY_TYPE } from "@prisma/client";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { cardId: string } }
): Promise<NextResponse<AuditLog[]>> {
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const auditLogs = await db.auditLog.findMany({
      where: {
        orgId,
        entityId: params.cardId,
        entityType: ENTITY_TYPE.CARD,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });
    return NextResponse.json(auditLogs);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
