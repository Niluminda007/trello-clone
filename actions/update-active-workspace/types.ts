import z from "zod";
import { UpdateActiveWorkspace } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Workspace } from "@prisma/client";

export type InputType = z.infer<typeof UpdateActiveWorkspace>;
export type ReturnType = ActionState<InputType, Workspace>;
