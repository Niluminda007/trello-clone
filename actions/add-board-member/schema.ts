import { BoardRole } from "@prisma/client";
import * as z from "zod";

export const AddBoardMember = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  role: z.nativeEnum(BoardRole),
  boardId: z.string(),
});
