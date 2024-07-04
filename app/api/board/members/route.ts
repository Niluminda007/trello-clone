import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getRandomColor } from "@/lib/utils";
import { BoardRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user || !user.id || !user.workspaceId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { boardId } = await req.json();
    if (!boardId) {
      return new NextResponse("No Board Id given", { status: 400 });
    }
    const boardMemberships = await db.boardMembership.findMany({
      where: {
        boardId,
      },
      include: {
        user: true,
      },
    });
    const guestMemberships = await db.boardGuestMembership.findMany({
      where: {
        boardId,
      },
    });
    const boardUsers = boardMemberships.map((member) => ({
      id: member.id,
      name: member.user.name,
      image: member.user.image,
      email: member.user.email,
      role: member.role,
      accentColor: member.user.accentColor,
    }));
    const guestUsers = guestMemberships.map((member) => ({
      id: member.id,
      name: undefined,
      image: undefined,
      email: member.email,
      role: BoardRole.GUEST,
      accentColor: member.accentColor,
    }));

    return NextResponse.json([...boardUsers, ...guestUsers]);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
