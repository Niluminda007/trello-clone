import * as z from "zod";
import { GenerateWorkspaceInviteLink } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof GenerateWorkspaceInviteLink>;
export type ReturnType = ActionState<InputType, string>;
