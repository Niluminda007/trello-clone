import { db } from "@/lib/db";

export const getWorkspaceById = async (id: string | undefined) => {
  try {
    if (!id) {
      return null;
    }
    return await db.workspace.findUnique({
      where: {
        id,
      },
      include: {
        members: true,
        boards: true,
      },
    });
  } catch (error) {
    return null;
  }
};

export const getWorkspaceByUserId = async (id: string | undefined) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });
  return user?.activeWorkspace;
};
