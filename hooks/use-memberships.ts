import { Membership, Workspace } from "@prisma/client";
import { create } from "zustand";

type WorkspaceListStore = {
  workspaces: Workspace[] | undefined;
  setWorkspaces: (workspaces: Workspace[]) => void;
};
export const useWorkspaceList = create<WorkspaceListStore>((set) => ({
  workspaces: undefined,
  setWorkspaces: (data: Workspace[]) => set({ workspaces: data }),
}));
