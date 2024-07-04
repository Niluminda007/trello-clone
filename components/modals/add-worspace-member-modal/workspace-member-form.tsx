import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAction } from "@/hooks/use-action";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WorkspaceRole } from "@prisma/client";
import { useState } from "react";
import { addWorkspaceMember } from "@/actions/add-workspace-member";
import { useQueryClient } from "@tanstack/react-query";

export const WorkspaceMemberForm = () => {
  const params = useParams();
  const queryClient = useQueryClient();

  const [selectedRole, setSelectedRole] = useState<WorkspaceRole>(
    WorkspaceRole.MEMBER
  );

  const { execute } = useAction(addWorkspaceMember, {
    onSuccess: async (data) => {
      if (data) {
        toast.success(`${data} member added`);
      }
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (data: FormData) => {
    const email = data.get("workspace-member-email") as string;
    execute({ email, role: selectedRole, workspaceId: params.wId as string });
  };

  return (
    <div className="w-full p-4 bg-gray-800 rounded-lg shadow-md">
      <form className="flex items-center space-x-4" action={onSubmit}>
        <Input
          id="workspace-member-email"
          name="workspace-member-email"
          type="email"
          placeholder="Enter member email"
          className="flex-1 border-neutral-600 focus-visible:border-none focus-visible:ring-sky-400"
          required
        />
        <Select
          onValueChange={(value) => setSelectedRole(value as WorkspaceRole)}>
          <SelectTrigger className="w-40 text-secondary-foreground">
            <SelectValue
              id="member-role"
              defaultValue={selectedRole}
              placeholder="Select Role"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={WorkspaceRole.MEMBER}>Member</SelectItem>
            <SelectItem value={WorkspaceRole.ADMIN}>Admin</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="primary" type="submit">
          Add
        </Button>
      </form>
    </div>
  );
};
