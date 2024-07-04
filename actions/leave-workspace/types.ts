import { z } from "zod";
import { LeaveWorkspace } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Workspace } from "@prisma/client";

export type InputType = z.infer<typeof LeaveWorkspace>;
export type ReturnType = ActionState<InputType, Workspace>;
