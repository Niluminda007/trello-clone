import { BoardRole } from "@prisma/client";
import { db } from "./db";
import {
  createBoardMembershipForUser,
  getGuestBoardMembershipByEmail,
} from "./boards";
import { updateDbUserProperties } from "./user";

// export const updateBoardGuestToBoardMember = async (
//   email: string | null,
//   userId: string
// ) => {
//   if (!email || !userId) {
//     return;
//   }
//   try {
//     const guestMembership = await db.boardGuestMembership.findFirst({
//       where: {
//         email: email,
//       },
//     });

//     if (guestMembership) {
//       await db.boardMembership.create({
//         data: {
//           boardId: guestMembership.boardId,
//           userId: userId,
//           role: BoardRole.MEMBER,
//         },
//       });
//       await db.user.update({
//         where: {
//           id: userId,
//         },
//         data: {
//           accentColor: guestMembership.accentColor,
//         },
//       });

//       await db.boardGuestMembership.delete({
//         where: {
//           id: guestMembership.id,
//         },
//       });
//       return;
//     }
//   } catch (error) {
//     console.error(error);
//     return;
//   }
// };

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
      await createBoardMembershipForUser(guestMembership.boardId, userId);
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
