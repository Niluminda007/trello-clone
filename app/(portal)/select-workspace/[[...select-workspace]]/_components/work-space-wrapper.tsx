import { Suspense } from "react";

import { WorkspaceList, WorkspaceListSkeleton } from "./workspace-list";
import { getUserWorkspaces } from "@/lib/workspace";

export const WorkspaceWrapper = async () => {
  const workspaces = await getUserWorkspaces();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-6xl flex-1 mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-700">
            Select a Workspace to Continue
          </h1>
          <p className="text-gray-600 mt-2">
            Choose a workspace to start collaborating with your team.
          </p>
        </div>
        {workspaces && (
          <Suspense fallback={<WorkspaceListSkeleton />}>
            <WorkspaceList workspaces={workspaces} />
          </Suspense>
        )}
      </div>
    </div>
  );
};
