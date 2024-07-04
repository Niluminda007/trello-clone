import z from "zod";

export const UpdateActiveWorkspace = z.object({
  currentWorkspace: z.string(),
});
