"use client";

import { Separator } from "@/components/ui/separator";
import WorkspaceProfile from "@/components/workspace-profile";
import { useWorkspace } from "@/hooks/use-workspace";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { LeaveWorkspace } from "./_components/leave-workspace";

const SettingsPage = () => {
  const { activeWorkspace } = useWorkspace();
  const router = useRouter();

  if (!activeWorkspace) {
    return null;
  }

  const navigateToProfileSettings = () => {
    router.push(`/w/${activeWorkspace.id}/settings/profile`);
  };

  return (
    <div className="w-full flex flex-col space-y-6 p-2 md:p-6 bg-white rounded-lg">
      <div className="flex flex-col space-y-2">
        <h1 className="text-gray-900 text-2xl md:text-4xl font-bold">
          Settings
        </h1>
        <span className="text-gray-600 text-xs md:text-lg">
          Manage Workspace settings
        </span>
      </div>
      <div className="flex flex-col space-y-4">
        <p className="text-lg font-medium text-gray-900">Workspace Profile</p>
        <Separator orientation="horizontal" className="mb-4" />
        <div
          role="button"
          onClick={navigateToProfileSettings}
          className="h-16 w-full flex items-center justify-between md:px-6 bg-gray-50 rounded-lg transition-all duration-300 ease-in-out transform hover:bg-gray-100 hover:shadow-md hover:scale-105 group cursor-pointer">
          <WorkspaceProfile name={activeWorkspace.name} />
          <ArrowRight className="w-6 h-6 text-gray-500 ml-auto transform transition-transform duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-2" />
        </div>
      </div>
      <LeaveWorkspace workspaceId={activeWorkspace.id} />
    </div>
  );
};

export default SettingsPage;
