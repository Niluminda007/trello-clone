import { z } from "zod";

export const UpdateLabel = z.object({
  labelId: z.string(),
  values: z
    .object({
      title: z.string().optional(),
      color: z.string().optional(),
    })
    .optional(),
  boardId: z.string(),
});
