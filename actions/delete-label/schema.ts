import { z } from "zod";

export const DeleteLabel = z.object({
  labelId: z.string(),
  boardId: z.string(),
});
