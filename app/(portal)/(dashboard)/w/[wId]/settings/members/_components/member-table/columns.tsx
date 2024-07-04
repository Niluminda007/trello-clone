"use client";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuItem,
// } from "@/components/ui/dropdown-menu";

// import { UserAvatar } from "@/components/user-avatar";
// import { fetcher } from "@/lib/fetcher";
// import { Membership, User, WorkspaceRole } from "@prisma/client";
// import { useMutation } from "@tanstack/react-query";

// import { ColumnDef } from "@tanstack/react-table";
// import { ChevronDown, MoreHorizontal } from "lucide-react";
// import React, { useState } from "react";
// import { ArrowUpDown } from "lucide-react";
// import { toast } from "sonner";
// import { filterUserByNameOrEmail } from "./data-table";

// export type WorkspaceMember = {
//   id: string;
//   user: User;
//   joined: Date;
//   role: WorkspaceRole;
// };

// export const columns: ColumnDef<WorkspaceMember>[] = [
//   {
//     accessorKey: "user",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
//           User
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },
//     filterFn: filterUserByNameOrEmail,
//     cell: ({ row }) => {
//       const user: User = row.getValue("user");

//       return (
//         <div className="flex space-x-2 items-center">
//           <UserAvatar
//             name={user.name!}
//             image={user.image ? user.image : ""}
//             email={user.email ? user.email : ""}
//             className="w-8 h-8"
//           />
//           <div className="flex flex-col spcae-y-2">
//             <p className="text-xs font-semibold text-neutral-900">
//               {user.name}
//             </p>
//             <p className="text-xs  text-neutral-300">{user.email}</p>
//           </div>
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "joined",
//     header: "Joined",
//     cell: ({ row }) => {
//       const joinedDate = new Date(row.getValue("joined"));
//       joinedDate.setUTCDate(joinedDate.getUTCDate() - 1);
//       const formattedDate = joinedDate.toLocaleDateString("en-US", {
//         month: "numeric",
//         day: "numeric",
//         year: "numeric",
//       });

//       return <div className="text-neutral-800">{formattedDate}</div>;
//     },
//   },
//   {
//     accessorKey: "role",
//     header: "Role",
//     cell: ({ row }) => {
//       const [currentRole, setCurrentRole] = useState<WorkspaceRole>(
//         row.getValue("role") as WorkspaceRole
//       );
//       const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//       const mutation = useMutation<
//         { data: Membership & { user: User } },
//         Error,
//         { memberId: string; newRole: WorkspaceRole }
//       >({
//         mutationFn: ({ memberId, newRole }) =>
//           fetcher({
//             url: "/workspace/members/change-role",
//             method: "POST",
//             data: {
//               memberId: memberId,
//               role: newRole,
//             },
//           }),
//         onSuccess: ({
//           data: {
//             role,
//             user: { name },
//           },
//         }) => {
//           if (role && name) {
//             setCurrentRole(role);

//             toast.success(`Member ${name}'s role changed to ${role}`);
//           }
//           setIsDropdownOpen(false);
//         },
//         onError: (error) => {
//           console.error(error);
//           toast.error(error.message);
//           setIsDropdownOpen(false);
//         },
//       });

//       const handleRoleChange = (newRole: WorkspaceRole) => {
//         setIsDropdownOpen(false);
//         mutation.mutate({
//           memberId: row.original.id,
//           newRole: newRole,
//         });
//       };

//       return (
//         <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
//           <DropdownMenuTrigger asChild>
//             <Button
//               variant={"ghost"}
//               className="text-neutral-500 border border-solid border-neutral-400 flex items-center justify-between w-full"
//               disabled={mutation.isPending}
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
//               {currentRole}

//               <ChevronDown
//                 className={`text-neutral-500 ml-2 transform transition-transform duration-200 ${
//                   isDropdownOpen ? "rotate-180" : "rotate-0"
//                 }`}
//               />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="start">
//             <DropdownMenuItem
//               onClick={() => handleRoleChange(WorkspaceRole.ADMIN)}>
//               {WorkspaceRole.ADMIN}
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               onClick={() => handleRoleChange(WorkspaceRole.MEMBER)}>
//               {WorkspaceRole.MEMBER}
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
//   {
//     id: "actions",
//     cell: ({ row }) => {
//       const mutation = useMutation<
//         { data: Membership & { user: User } },
//         Error,
//         { memberId: string }
//       >({
//         mutationFn: ({ memberId }) =>
//           fetcher({
//             url: "/workspace/members/delete",
//             method: "POST",
//             data: {
//               memberId,
//             },
//           }),
//         onSuccess: ({
//           data: {
//             user: { name },
//           },
//         }) => {
//           if (name) {
//             toast.success(`Member ${name} deleted`);
//           }
//         },
//         onError: (error) => {
//           console.error(error);
//           toast.error(error.message);
//         },
//       });

//       const handleDeleteMember = () => {
//         mutation.mutate({ memberId: row.original.id });
//       };
//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant={"ghost"} className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem onClick={handleDeleteMember}>
//               Delete Member
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import { User, WorkspaceRole } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { filterUserByNameOrEmail } from "./data-table";
import { RoleCell, ActionsCell } from "./custom-cells";

export type WorkspaceMember = {
  id: string;
  user: User;
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
      const user: User = row.getValue("user");

      return (
        <div className="flex space-x-2 items-center">
          <UserAvatar
            name={user.name!}
            image={user.image ? user.image : ""}
            email={user.email ? user.email : ""}
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
    cell: RoleCell,
  },
  {
    id: "actions",
    cell: ActionsCell,
  },
];
