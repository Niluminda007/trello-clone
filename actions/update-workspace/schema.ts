import { z } from "zod";

export const UpdateWorkspace = z.object({
  name: z
    .string({
      required_error: "workspace name is required",
      invalid_type_error: "workspace name is required",
    })
    .min(2, {
      message: "workspace name is too short",
    }),
  description: z.string().optional(),
  workspaceId: z.string(),
});
