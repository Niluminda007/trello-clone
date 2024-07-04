import * as z from "zod";
import { GenerateInviteLink } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof GenerateInviteLink>;
export type ReturnType = ActionState<InputType, string>;
