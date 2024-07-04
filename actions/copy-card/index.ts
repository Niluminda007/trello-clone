// "use server";

// import { revalidatePath } from "next/cache";
// import { ACTION, ENTITY_TYPE } from "@prisma/client";

// import { createSafeAction } from "@/lib/create-safe-action";
// import { InputType, ReturnType } from "./types";
// import { CopyCard } from "./schema";
// import { db } from "@/lib/db";
// import { createAuditLog } from "@/lib/create-audit-log";
// import { currentUser } from "@/lib/auth";

// const handler = async (data: InputType): Promise<ReturnType> => {
//   const user = await currentUser();
//   if (!user || !user.workspaceId) {
//     return {
//       error: "unauthorized!!!",
//     };
//   }
//   const { id, boardId } = data;
//   let card;
//   try {
//     const cardToCopy = await db.card.findUnique({
//       where: {
//         id,
//         list: {
//           board: {
//             workspaceId: user.workspaceId,
//           },
//         },
//       },
//       include: {
//         cardLabels: true,
//       },
//     });
//     if (!cardToCopy) {
//       return {
//         error: "Card not found",
//       };
//     }
//     const lastCard = await db.card.findFirst({
//       where: { listId: cardToCopy.listId },
//       orderBy: { order: "desc" },
//       select: { order: true },
//     });
//     const newOrder = lastCard ? lastCard.order + 1 : 1;

//     card = await db.card.create({
//       data: {
//         title: `${cardToCopy.title} -Copy`,
//         description: cardToCopy.description,
//         order: newOrder,
//         listId: cardToCopy.listId,
//       },
//     });

//     if(cardToCopy.cardLabels && cardToCopy.cardLabels.length > 0) {
//       const transaction = cardToCopy.cardLabels.map(async (cardLabel) => (
//         await db.cardLabel.create({
//           data:{
//             cardId: card.id,
//             labelId: cardLabel.labelId

//           }
//         })
//       ))
//       await db.$transaction(transaction);
//     }

//     await createAuditLog({
//       entityId: card.id,
//       entityTitle: card.title,
//       entityType: ENTITY_TYPE.CARD,
//       action: ACTION.CREATE,
//     });
//     revalidatePath(`/board/${boardId}`);
//     return {
//       data: card,
//     };
//   } catch (error) {
//     return {
//       error: "Error to  Copy",
//     };
//   }
// };

// export const copyCard = createSafeAction(CopyCard, handler);

"use server";

import { revalidatePath } from "next/cache";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { CopyCard } from "./schema";
import { db } from "@/lib/db";
import { createAuditLog } from "@/lib/create-audit-log";
import { currentUser } from "@/lib/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser();
  if (!user || !user.workspaceId) {
    return {
      error: "unauthorized!!!",
    };
  }
  const { id, boardId } = data;

  try {
    const cardToCopy = await db.card.findUnique({
      where: {
        id,
        list: {
          board: {
            workspaceId: user.workspaceId,
          },
        },
      },
      include: {
        cardLabels: true,
      },
    });
    if (!cardToCopy) {
      return {
        error: "Card not found",
      };
    }

    const lastCard = await db.card.findFirst({
      where: { listId: cardToCopy.listId },
      orderBy: { order: "desc" },
      select: { order: true },
    });
    const newOrder = lastCard ? lastCard.order + 1 : 1;

    const card = await db.card.create({
      data: {
        title: `${cardToCopy.title} - Copy`,
        description: cardToCopy.description,
        order: newOrder,
        listId: cardToCopy.listId,
      },
    });

    if (cardToCopy.cardLabels && cardToCopy.cardLabels.length > 0) {
      const transaction = cardToCopy.cardLabels.map((cardLabel) =>
        db.cardLabel.create({
          data: {
            cardId: card.id,
            labelId: cardLabel.labelId,
          },
        })
      );
      await db.$transaction(transaction);
    }

    await createAuditLog({
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.CREATE,
    });

    revalidatePath(`/board/${boardId}`);

    return {
      data: card,
    };
  } catch (error) {
    return {
      error: "Error to Copy",
    };
  }
};

export const copyCard = createSafeAction(CopyCard, handler);
