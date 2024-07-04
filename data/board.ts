import { db } from "@/lib/db";
import { BoardRole } from "@prisma/client";

export const getBoardById = async (id: string | undefined) => {
  try {
    if (!id) {
      return null;
    }
    const board = await db.board.findUnique({
      where: {
        id,
      },
      include: {
        boardMemberships: {
          where: {
            role: BoardRole.ADMIN,
          },
          include: {
            user: true,
          },
        },
      },
    });
    return board;
  } catch (error) {
    return null;
  }
};
