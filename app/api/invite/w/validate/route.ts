import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { BoardRole } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    const existingToken = await db.workspaceInviteToken.findUnique({
      where: {
        token: token,
      },
    });
    if (!existingToken) {
      return new NextResponse("No Invite token found", { status: 500 });
    }
    const user = await currentUser();

    // If the user is already authenticated
    if (user && user.id && user.workspaceId) {
      // Check if the user is already a workspace member
      const existingMember = await db.membership.findFirst({
        where: {
          userId: user.id,
          workspaceId: existingToken.workspaceId,
        },
        include: {
          workspace: true,
        },
      });

      if (existingMember) {
        //changing user active workspace to the invited board workspace
        await db.user.update({
          where: {
            id: user.id,
          },
          data: {
            activeWorkspace: existingMember.workspaceId,
          },
        });

        return NextResponse.json({
          redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/w/${existingMember.workspaceId}`,
        });
      }
      const newMembership = await db.membership.create({
        data: {
          workspaceId: existingToken.workspaceId,
          userId: user.id,
          role: BoardRole.MEMBER,
        },
        include: {
          workspace: true,
        },
      });

      if (newMembership) {
        //change the user active worksapce id to relevant invited workspace id
        await db.user.update({
          where: {
            id: user.id,
          },
          data: {
            activeWorkspace: newMembership.workspaceId,
          },
        });

        return NextResponse.json({
          redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/w/${newMembership.workspaceId}`,
        });
      }
    }
    // If the user is not authenticated set the boardId in the cookies and redirect to accept board page
    const response = NextResponse.json({
      redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/invite/accept-workspace`,
    });

    response.cookies.set("invited-workspace-id", existingToken.workspaceId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    return response;
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
