"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { WorkspaceRole, User, Membership } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { fetcher } from "@/lib/fetcher";

const RoleCell = ({ row }: { row: any }) => {
  const [currentRole, setCurrentRole] = useState<WorkspaceRole>(
    row.getValue("role") as WorkspaceRole
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const mutation = useMutation<
    { data: Membership & { user: User } },
    Error,
    { memberId: string; newRole: WorkspaceRole }
  >({
    mutationFn: ({ memberId, newRole }) =>
      fetcher({
        url: "/workspace/members/change-role",
        method: "POST",
        data: {
          memberId: memberId,
          role: newRole,
        },
      }),
    onSuccess: ({
      data: {
        role,
        user: { name },
      },
    }) => {
      if (role && name) {
        setCurrentRole(role);
        toast.success(`Member ${name}'s role changed to ${role}`);
      }
      setIsDropdownOpen(false);
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
      setIsDropdownOpen(false);
    },
  });

  const handleRoleChange = (newRole: WorkspaceRole) => {
    setIsDropdownOpen(false);
    mutation.mutate({
      memberId: row.original.id,
      newRole: newRole,
    });
  };

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className="text-neutral-500 border border-solid border-neutral-400 flex items-center justify-between w-full"
          disabled={mutation.isPending}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          {currentRole}

          <ChevronDown
            className={`text-neutral-500 ml-2 transform transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => handleRoleChange(WorkspaceRole.ADMIN)}>
          {WorkspaceRole.ADMIN}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleRoleChange(WorkspaceRole.MEMBER)}>
          {WorkspaceRole.MEMBER}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ActionsCell = ({ row }: { row: any }) => {
  const mutation = useMutation<
    { data: Membership & { user: User } },
    Error,
    { memberId: string }
  >({
    mutationFn: ({ memberId }) =>
      fetcher({
        url: "/workspace/members/delete",
        method: "POST",
        data: {
          memberId,
        },
      }),
    onSuccess: ({ data }) => {
      toast.success(`Member ${data.user?.name || ""} deleted`);
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  const handleDeleteMember = () => {
    mutation.mutate({ memberId: row.original.id });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleDeleteMember}>
          Delete Member
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { RoleCell, ActionsCell };
