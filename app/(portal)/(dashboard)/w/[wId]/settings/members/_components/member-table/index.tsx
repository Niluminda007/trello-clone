"use client";

import { fetcher } from "@/lib/fetcher";

import { useQuery } from "@tanstack/react-query";
import { WorkspaceMember, columns } from "./columns";
import { DataTable } from "./data-table";

interface MembersTableProps {
  workspaceId: string;
}

export const MembersTable = ({ workspaceId }: MembersTableProps) => {
  const { data: members, isLoading } = useQuery<WorkspaceMember[]>({
    queryKey: ["workspace-members", workspaceId],
    queryFn: () =>
      fetcher({
        url: "/workspace/members",
        method: "POST",
        data: {
          workspaceId,
        },
      }),
    enabled: !!workspaceId,
  });

  if (!members) {
    return null;
  }

  return <DataTable columns={columns} data={members} />;
};
