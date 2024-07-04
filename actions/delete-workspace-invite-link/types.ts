import * as z from "zod";
import { DeleteWorkspaceInviteLink } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof DeleteWorkspaceInviteLink>;
export type ReturnType = ActionState<InputType, string>;
