import { v4 as uuidv4 } from "uuid";
import { db } from "./db";

export const createInviteToken = async (
  boardId: string
): Promise<string | null> => {
  try {
    const inviteToken = uuidv4();
    await db.inviteToken.create({
      data: {
        token: inviteToken,
        boardId,
      },
    });
    return inviteToken;
  } catch (error) {
    console.error("Error creating invite token:", error);
    return null;
  }
};

export const createWorkspaceInviteToken = async (
  workspaceId: string
): Promise<string | null> => {
  try {
    const inviteToken = uuidv4();
    await db.workspaceInviteToken.create({
      data: {
        token: inviteToken,
        workspaceId,
      },
    });
    return inviteToken;
  } catch (error) {
    console.error("Error creating invite token:", error);
    return null;
  }
};
