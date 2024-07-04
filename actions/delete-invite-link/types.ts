import * as z from "zod";
import { DeleteInviteLink } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof DeleteInviteLink>;
export type ReturnType = ActionState<InputType, string>;
