import z from "zod";
import { CreateWorkspace } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Workspace } from "@prisma/client";

export type InputType = z.infer<typeof CreateWorkspace>;
export type ReturnType = ActionState<InputType, Workspace>;
