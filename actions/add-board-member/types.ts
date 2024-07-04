import * as z from "zod";
import { AddBoardMember } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof AddBoardMember>;
export type ReturnType = ActionState<InputType, string>;
