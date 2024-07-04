import { NextResponse } from "next/server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const user = await currentUser();
    if (!user || !user.id || !user.workspaceId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const card = await db.card.findUnique({
      where: {
        id: params.cardId,
        list: {
          board: {
            workspaceId: user.workspaceId,
          },
        },
      },
      include: {
        list: {
          select: {
            title: true,
          },
        },
        cardLabels: {
          include: {
            label: true,
          },
        },
      },
    });

    return NextResponse.json(card);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
