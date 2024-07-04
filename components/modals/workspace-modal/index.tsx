"use client";

import { WorkspaceForm } from "@/app/(portal)/select-workspace/[[...select-workspace]]/_components/workspace-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useWorkspaceModal } from "@/hooks/use-workspace-modal";
import { DialogDescription } from "@radix-ui/react-dialog";

export const WorkspaceModal = () => {
  const workspaceModal = useWorkspaceModal();

  return (
    <Dialog open={workspaceModal.isOpen} onOpenChange={workspaceModal.onClose}>
      <DialogContent>
        <DialogHeader hidden>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <WorkspaceForm />
      </DialogContent>
    </Dialog>
  );
};
