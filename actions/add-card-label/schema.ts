import * as z from "zod";

export const AddCardLabel = z.object({
  labelId: z.string(),
  cardId: z.string(),
  boardId: z.string(),
});
