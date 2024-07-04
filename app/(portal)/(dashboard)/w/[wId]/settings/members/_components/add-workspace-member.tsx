"use client";

import { Button } from "@/components/ui/button";
import { useAddWorkspaceMemberModal } from "@/hooks/use-add-workspace-member-modal";
import { Plus } from "lucide-react";

interface AddWorkspaceMemberProps {
  workspaceId: string;
}

export const AddWorkspaceMember = ({
  workspaceId,
}: AddWorkspaceMemberProps) => {
  const { onOpen } = useAddWorkspaceMemberModal();

  const handleAddWorkspaceMember = () => {
    onOpen(workspaceId);
  };
  return (
    <div className="font-medium text-sm flex items-center mb-1 space-x-4">
      <span>Add Workspace Member</span>
      <Button
        asChild
        type="button"
        variant="ghost"
        className="w-8 h-8 p-2"
        onClick={handleAddWorkspaceMember}>
        <Plus className="h-4 w-4 cursor-pointer" />
      </Button>
    </div>
  );
};
