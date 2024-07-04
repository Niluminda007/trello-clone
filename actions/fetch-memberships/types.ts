import z from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { Workspace } from "@prisma/client";
import { FetchWorkspaceList } from "./schema";

export type InputType = z.infer<typeof FetchWorkspaceList>;
export type ReturnType = ActionState<InputType, Workspace[]>;
