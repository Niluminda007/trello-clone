"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { UpdateActiveWorkspace } from "./schema";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getWorkspaceById } from "@/data/workspace";
import { currentUser } from "@/lib/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return {
        error: "unauthorized",
      };
    }
    const validatedData = UpdateActiveWorkspace.safeParse(data);
    if (!validatedData.success) {
      return {
        error: "Invalid fields",
      };
    }

    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        activeWorkspace: data.currentWorkspace,
      },
    });
    const workspace = await getWorkspaceById(updatedUser.activeWorkspace!);
    if (!workspace) {
      return {
        error: "No workspace found",
      };
    }

    revalidatePath(`/select-workspace`);
    return {
      data: workspace,
    };
  } catch (error) {
    return {
      error: "Unable to update the workspace to the session",
    };
  }
};

export const updateActiveWorkspace = createSafeAction(
  UpdateActiveWorkspace,
  handler
);
