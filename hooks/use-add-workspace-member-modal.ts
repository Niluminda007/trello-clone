import { create } from "zustand";

type AddWorkspaceMemberStore = {
  id?: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
};

export const useAddWorkspaceMemberModal = create<AddWorkspaceMemberStore>(
  (set) => ({
    id: undefined,
    isOpen: false,
    onOpen: (id: string) => set({ id, isOpen: true }),
    onClose: () => set({ isOpen: false, id: undefined }),
  })
);
