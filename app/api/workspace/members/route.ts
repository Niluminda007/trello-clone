import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user || !user.id || !user.workspaceId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { workspaceId } = await req.json();
    if (!workspaceId) {
      return new NextResponse("No worksapce Id given", { status: 500 });
    }
    const workspaceMembers = await db.membership.findMany({
      where: {
        workspaceId,
      },
      include: {
        user: true,
      },
    });
    const modifiedMembers = workspaceMembers.map((member) => ({
      id: member.id,
      user: member.user,
      joined: member.createdAt,
      role: member.role,
    }));

    return NextResponse.json(modifiedMembers);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
