import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { BoardRole } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    const existingToken = await db.inviteToken.findUnique({
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
      // Check if the user is already a member of the board
      const existingMember = await db.boardMembership.findFirst({
        where: {
          userId: user.id,
          boardId: existingToken.boardId,
        },
        include: {
          board: true,
        },
      });

      if (existingMember) {
        //changing user active workspace to the invited board workspace
        await db.user.update({
          where: {
            id: user.id,
          },
          data: {
            activeWorkspace: existingMember.board.workspaceId,
          },
        });

        return NextResponse.json({
          redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/b/${existingMember.boardId}`,
        });
      }
      const newMembership = await db.boardMembership.create({
        data: {
          boardId: existingToken.boardId,
          userId: user.id,
          role: BoardRole.MEMBER,
        },
        include: {
          board: true,
        },
      });

      if (newMembership) {
        //change the user active worksapce id to relevant invited board id
        await db.user.update({
          where: {
            id: user.id,
          },
          data: {
            activeWorkspace: newMembership.board.workspaceId,
          },
        });

        return NextResponse.json({
          redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/b/${existingToken.boardId}`,
        });
      }
    }
    // If the user is not authenticated set the boardId in the cookies and redirect to accept board page
    const response = NextResponse.json({
      redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/invite/accept-board`,
    });

    response.cookies.set("invited-board-id", existingToken.boardId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    return response;
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
