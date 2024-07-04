import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { WorkspaceRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const user = await currentUser();
    if (!user || !user.id || !user.workspaceId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { memberId, role }: { memberId: string; role: WorkspaceRole } =
      await req.json();
    if (!role || !memberId) {
      return NextResponse.json({ error: "Missing Fields" }, { status: 400 });
    }

    const currentMember = await db.membership.findUnique({
      where: {
        id: memberId,
      },
      include: {
        user: true,
      },
    });
    if (!currentMember) {
      return NextResponse.json(
        { error: "There is no member with the given id" },
        { status: 400 }
      );
    }
    if (currentMember.role === role) {
      return NextResponse.json({ data: currentMember }, { status: 200 });
    }

    // Check if the current member is an admin and if changing their role would leave the workspace with less than one admin
    const isCurrentMemberAdmin = currentMember.role === WorkspaceRole.ADMIN;
    const adminsCount = await db.membership.count({
      where: {
        role: WorkspaceRole.ADMIN,
        workspaceId: user.workspaceId,
      },
    });

    if (isCurrentMemberAdmin && adminsCount <= 1) {
      return NextResponse.json(
        { error: "There has to be at least one admin for the workspace" },
        { status: 400 }
      );
    }

    const changedMembership = await db.membership.update({
      where: {
        id: memberId,
      },
      data: {
        role: role,
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json({ data: changedMembership }, { status: 200 });
  } catch (error) {
    console.error("Error updating membership role:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
