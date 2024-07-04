import { create } from "zustand";

type WorkspaceModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useWorkspaceModal = create<WorkspaceModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
