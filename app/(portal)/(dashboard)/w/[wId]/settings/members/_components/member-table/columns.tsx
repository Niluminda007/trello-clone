"use client";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import { User, WorkspaceRole } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { filterUserByNameOrEmail } from "./data-table";
import { ActionsCell } from "./custom-cells";

export type WorkspaceMember = {
  id: string;
  user: {
    name?: string;
    image?: string;
    email: string;
    accentColor?: string;
  };
  joined: Date;
  role: WorkspaceRole;
};

export const columns: ColumnDef<WorkspaceMember>[] = [
  {
    accessorKey: "user",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          User
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    filterFn: filterUserByNameOrEmail,
    cell: ({ row }) => {
      const user: {
        name?: string;
        image?: string;
        email: string;
        accentColor?: string;
      } = row.getValue("user");

      return (
        <div className="flex space-x-2 items-center">
          <UserAvatar
            name={user.name}
            image={user.image ? user.image : ""}
            email={user.email ? user.email : ""}
            accentColor={user.accentColor}
            className="w-8 h-8"
          />
          <div className="flex flex-col space-y-2">
            <p className="text-xs font-semibold text-neutral-900">
              {user.name}
            </p>
            <p className="text-xs text-neutral-300">{user.email}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "joined",
    header: "Joined",
    cell: ({ row }) => {
      const joinedDate = new Date(row.getValue("joined"));
      joinedDate.setUTCDate(joinedDate.getUTCDate() - 1);
      const formattedDate = joinedDate.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      });

      return <div className="text-neutral-800">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return (
        <Button variant={"outline"} size={"sm"}>
          {role}
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ActionsCell,
  },
];
