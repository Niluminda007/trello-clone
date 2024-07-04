import { z } from "zod";

export const LeaveWorkspace = z.object({
  workspaceId: z.string(),
});
