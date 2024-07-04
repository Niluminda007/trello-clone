import { db } from "@/lib/db";

export const getInviteLinkByBoardId = async (boardId: string) => {
  try {
    const invite = await db.inviteToken.findFirst({
      where: { boardId },
    });
    if (!invite) {
      return null;
    }

    const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/invite/b/${invite.token}`;
    return inviteLink;
  } catch (error) {
    console.error("Error fetching invite link:", error);
    return null;
  }
};

export const getInviteLinkByWorkspaceId = async (workspaceId: string) => {
  try {
    const invite = await db.workspaceInviteToken.findFirst({
      where: { workspaceId },
    });
    if (!invite) {
      return null;
    }

    const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/invite/w/${invite.token}`;
    return inviteLink;
  } catch (error) {
    console.error("Error fetching invite link:", error);
    return null;
  }
};
