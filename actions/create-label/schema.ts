import { z } from "zod";

export const CreateLabel = z.object({
  title: z.string().optional(),
  color: z.string({
    required_error: "Color is required",
    invalid_type_error: "Color is required",
  }),
  boardId: z.string(),
  cardId: z.string(),
});
