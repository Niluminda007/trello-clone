import { getInviteLinkByWorkspaceId } from "@/data/invite";
import { currentUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user || !user.id || !user.workspaceId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { workspaceId } = await req.json();
    if (!workspaceId) {
      return new NextResponse("No Workspace Id given", { status: 400 });
    }
    const inviteLink = await getInviteLinkByWorkspaceId(workspaceId);
    if (!inviteLink) {
      return NextResponse.json({ inviteLink: null });
    }

    return NextResponse.json({ inviteLink });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
