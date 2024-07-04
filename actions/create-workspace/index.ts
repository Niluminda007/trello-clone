"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { CreateWorkspace } from "./schema";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { WorkspaceRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { currentUser } from "@/lib/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return {
        error: "unauthorized!!!",
      };
    }

    const { name, description } = data;
    const userId = user.id;
    if (!name) {
      return {
        error: "Missing Fields",
      };
    }
    const workspace = await db.workspace.create({
      data: {
        name,
        description,
        adminId: userId,
      },
    });
    await db.membership.create({
      data: {
        userId,
        workspaceId: workspace.id,
        role: WorkspaceRole.ADMIN,
      },
    });
    revalidatePath("/select-workspace");
    return {
      data: workspace,
    };
  } catch (error) {
    return {
      error: "Failed to create workspace",
    };
  }
};

export const createWorkspace = createSafeAction(CreateWorkspace, handler);
