import { BoardRole } from "@prisma/client";
import * as z from "zod";

export const AddWorkspaceMember = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  role: z.nativeEnum(BoardRole),
  workspaceId: z.string(),
});
