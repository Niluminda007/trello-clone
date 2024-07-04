"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { FetchWorkspace } from "./schema";

import { revalidatePath } from "next/cache";
import { getWorkspaceById } from "@/data/workspace";
import { currentUser } from "@/lib/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  try {
    const user = await currentUser();
    if (!user || !user.workspaceId) {
      return {
        error: "unauthorized",
      };
    }
    const validatedData = FetchWorkspace.safeParse(data);
    if (!validatedData.success) {
      return {
        error: "Invalid fields",
      };
    }

    const { workspaceId } = validatedData.data;
    const workspace = await getWorkspaceById(workspaceId);
    if (!workspace) {
      return {
        error: "No workspace found",
      };
    }

    revalidatePath(`/w/${workspace.id}`);
    return {
      data: workspace,
    };
  } catch (error) {
    return {
      error: "Unable to update the workspace to the session",
    };
  }
};

export const fetchWorkspace = createSafeAction(FetchWorkspace, handler);
