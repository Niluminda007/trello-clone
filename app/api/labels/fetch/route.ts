import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cardId = searchParams.get("cardId");

    const user = await currentUser();
    if (!user || !user.id || !user.workspaceId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!cardId) {
      return new NextResponse("Card ID not provided", { status: 400 });
    }

    const labels = await db.label.findMany({});
    const cardLabels = await db.cardLabel.findMany({
      where: { cardId },
    });

    const labelsWithChecked = labels.map((label) => ({
      ...label,
      checked: cardLabels.some((item) => item.labelId === label.id),
    }));

    return NextResponse.json(labelsWithChecked);
  } catch (error) {
    console.error("Error fetching labels:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
