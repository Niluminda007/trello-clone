import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { WorkspaceRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Check if the user is authenticated and has a valid workspace ID
    const user = await currentUser();
    if (!user || !user.id || !user.workspaceId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if the requester is an admin
    const requesterMembership = await db.membership.findUnique({
      where: {
        userId_workspaceId: {
          userId: user.id,
          workspaceId: user.workspaceId,
        },
      },
    });

    if (
      !requesterMembership ||
      requesterMembership.role !== WorkspaceRole.ADMIN
    ) {
      return NextResponse.json(
        { error: "Only workspace admins can delete members" },
        { status: 403 }
      );
    }

    // Validate request payload
    const { memberId }: { memberId: string } = await req.json();
    if (!memberId) {
      return NextResponse.json({ error: "Missing Fields" }, { status: 400 });
    }

    // Check if the member exists
    const currentMember = await db.membership.findUnique({
      where: { id: memberId },
      include: { user: true },
    });

    if (!currentMember) {
      return NextResponse.json(
        { error: "There is no member with the given id" },
        { status: 400 }
      );
    }

    // Check if deleting the member would leave the workspace with less than one admin
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

    // Delete the member
    const deletedMembership = await db.membership.delete({
      where: { id: memberId },
    });

    // Delete the board memberships of the workspace member
    const memberAssociatedWorkspaceBoards = await db.board.findMany({
      where: { workspaceId: deletedMembership.workspaceId },
    });

    if (memberAssociatedWorkspaceBoards.length > 0) {
      const transaction = memberAssociatedWorkspaceBoards.map((board) =>
        db.boardMembership.delete({
          where: {
            userId_boardId: {
              boardId: board.id,
              userId: deletedMembership.userId,
            },
          },
        })
      );
      await db.$transaction(transaction);
    }

    return NextResponse.json({ data: deletedMembership }, { status: 200 });
  } catch (error) {
    console.error("Error deleting membership:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
