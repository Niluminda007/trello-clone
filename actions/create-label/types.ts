import { z } from "zod";
import { Label } from "@prisma/client";

import { CreateLabel } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof CreateLabel>;
export type ReturnType = ActionState<InputType, Label>;
