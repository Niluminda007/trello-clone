import z from "zod";
import { FetchWorkspace } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Workspace } from "@prisma/client";

export type InputType = z.infer<typeof FetchWorkspace>;
export type ReturnType = ActionState<InputType, Workspace>;
