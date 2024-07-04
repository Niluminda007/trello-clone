import * as z from "zod";

export const GenerateWorkspaceInviteLink = z.object({
  workspaceId: z.string({
    required_error: "WorkspaceId Id is required",
  }),
});
