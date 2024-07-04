import { Workspace } from "@prisma/client";
import { create } from "zustand";

type WorkspaceStore = {
  activeWorkspace: Workspace | undefined;
  setActiveWorkspace: (data: Workspace) => void;
};

export const useWorkspace = create<WorkspaceStore>((set) => ({
  activeWorkspace: undefined,
  setActiveWorkspace: (data: Workspace) => set({ activeWorkspace: data }),
}));
