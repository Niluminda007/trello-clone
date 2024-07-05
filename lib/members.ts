import { db } from "./db";
import {
  createBoardMembershipForUser,
  getGuestBoardMembershipByEmail,
} from "./boards";
import { updateDbUserProperties } from "./user";

export const updateBoardGuestToBoardMember = async (
  email: string | null,
  userId: string
) => {
  if (!email || !userId) {
    return;
  }
  try {
    const guestMembership = await getGuestBoardMembershipByEmail(email);
    if (guestMembership) {
      await createBoardMembershipForUser(
        guestMembership.boardId,
        userId,
        guestMembership.prospectRole
      );
      await updateDbUserProperties(userId, {
        accentColor: guestMembership.accentColor,
      });

      await db.boardGuestMembership.delete({
        where: {
          id: guestMembership.id,
        },
      });
      return;
    }
  } catch (error) {
    console.error(error);
    return;
  }
};
