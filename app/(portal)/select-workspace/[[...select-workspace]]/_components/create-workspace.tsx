"use client";

import { HelpCircle } from "lucide-react";

import Hint from "@/components/hint";
import { useWorkspaceModal } from "@/hooks/use-workspace-modal";

export const CreateWorkspace = () => {
  const workspaceModal = useWorkspaceModal();
  return (
    <div
      onClick={() => workspaceModal.onOpen()}
      role="button"
      className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition">
      <p className="text-sm">Create New Workspace</p>
      <Hint
        sideOffset={40}
        description={`You can create a new workspace by clicking here`}>
        <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
      </Hint>
    </div>
  );
};
