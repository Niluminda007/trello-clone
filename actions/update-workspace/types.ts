import { z } from "zod";
import { Workspace } from "@prisma/client";

import { UpdateWorkspace } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof UpdateWorkspace>;
export type ReturnType = ActionState<InputType, Workspace>;
