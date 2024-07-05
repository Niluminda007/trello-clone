import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { WorkspaceRole } from "@prisma/client";
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
    // const modifiedMembers = workspaceMembers.map((member) => ({
    //   id: member.id,
    //   user: member.user,
    //   joined: member.createdAt,
    //   role: member.role,
    // }));

    const modifiedMembers = workspaceMembers.map((member) => ({
      id: member.id,
      user: {
        name: member.user.name,
        image: member.user.image,
        email: member.user.email,

        accentColor: member.user.accentColor,
      },
      joined: member.createdAt,
      role: member.role,
    }));

    /*
    id: member.id,
      name: member.user.name,
      image: member.user.image,
      email: member.user.email,
      role: member.role,
      accentColor: member.user.accentColor,
      */
    const guestMembers = await db.workspaceGuestMembership.findMany({
      where: {
        workspaceId,
      },
    });
    const modifiedGuestMembers = guestMembers.map((gMember) => ({
      id: gMember.id,
      user: {
        name: undefined,
        image: undefined,
        email: gMember.email,
        accentColor: gMember.accentColor,
      },
      joined: gMember.createdAt,
      role: WorkspaceRole.GUEST,
    }));

    return NextResponse.json([...modifiedMembers, ...modifiedGuestMembers]);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
