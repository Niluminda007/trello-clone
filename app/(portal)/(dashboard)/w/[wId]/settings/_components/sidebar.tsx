"use client";

import { WorkspaceImage } from "@/components/workspace-image";
import WorkspaceProfile from "@/components/workspace-profile";
import { cn } from "@/lib/utils";
import { Workspace } from "@prisma/client";
import { SettingsIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SettingsSidebarProps {
  workspace: Workspace;
}

export const Sidebar = ({ workspace: { name, id } }: SettingsSidebarProps) => {
  const currentPath = usePathname();

  return (
    <div className="flex flex-col space-y-4">
      <WorkspaceProfile name={name} />
      <div className="flex flex-col space-y-2">
        <Link
          className={cn(
            "w-full px-2  md:px-4 py-3 rounded-md bg-transparent transition ease-linear hover:bg-neutral-200 text-neutral-400  flex justify-start items-center space-x-2",
            !currentPath.includes("/members") &&
              "bg-neutral-100  text-neutral-600"
          )}
          href={`/w/${id}/settings`}>
          <SettingsIcon className="md:size-4 sm:size-2" />
          <span className="text-sm md:text-lg">Settings</span>
        </Link>
        <Link
          className={cn(
            "w-full   px-2  md:px-4 py-3 rounded-md bg-transparent transition ease-linear hover:bg-neutral-200 text-neutral-400  flex justify-start items-center space-x-2",
            currentPath.includes("/members") &&
              "bg-neutral-100  text-neutral-600"
          )}
          href={`/w/${id}/settings/members`}>
          <UserIcon className="md:size-4 sm:size-2" />
          <span className="text-sm md:text-lg"> Members</span>
        </Link>
      </div>
    </div>
  );
};
