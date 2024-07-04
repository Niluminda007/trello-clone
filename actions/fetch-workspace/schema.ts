import z from "zod";

export const FetchWorkspace = z.object({
  workspaceId: z.string(),
});
