import { z } from "zod";

import { DeleteLabel } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Label } from "@prisma/client";

export type InputType = z.infer<typeof DeleteLabel>;
export type ReturnType = ActionState<InputType, Label>;
