import * as z from "zod";

import { AddCardLabel } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof AddCardLabel>;
export type ReturnType = ActionState<InputType, string>;
