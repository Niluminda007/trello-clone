import * as z from "zod";

export const GenerateInviteLink = z.object({
  boardId: z.string({
    required_error: "Board Id is required",
  }),
});
