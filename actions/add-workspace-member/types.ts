import * as z from "zod";
import { AddWorkspaceMember } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof AddWorkspaceMember>;
export type ReturnType = ActionState<InputType, string>;
