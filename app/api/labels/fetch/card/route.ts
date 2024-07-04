import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user || !user.id || !user.workspaceId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { cardId } = body;

    if (!cardId) {
      return new NextResponse("Missing cardId", { status: 400 });
    }

    const cardLabels = await db.cardLabel.findMany({
      where: {
        cardId: cardId,
      },
      include: {
        label: true,
      },
    });

    const labels = cardLabels.map((cardLabel) => cardLabel.label);

    return NextResponse.json(labels);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
