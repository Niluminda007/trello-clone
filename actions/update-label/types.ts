import { z } from "zod";
import { Label } from "@prisma/client";

import { UpdateLabel } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof UpdateLabel>;
export type ReturnType = ActionState<InputType, Label>;
