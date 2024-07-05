"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User, Membership } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { toast } from "sonner";
import { fetcher } from "@/lib/fetcher";
import { MoreHorizontal } from "lucide-react";
import { useParams } from "next/navigation";

const ActionsCell = ({ row }: { row: any }) => {
  const queryClient = useQueryClient();
  const params = useParams();
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
      queryClient.invalidateQueries({
        queryKey: ["workspace-members", params.wId as string],
      });
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

export { ActionsCell };
