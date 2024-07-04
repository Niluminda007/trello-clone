import * as z from "zod";

export const DeleteWorkspaceInviteLink = z.object({
  workspaceId: z.string({
    required_error: "borad id is required",
  }),
  token: z.string({
    required_error: "token id is required",
  }),
});
