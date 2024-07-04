import { Workspace } from "@prisma/client";

import { Skeleton } from "@/components/ui/skeleton";
import { WorkspaceItem } from "./work-space-item";
import { CreateWorkspace } from "./create-workspace";

interface WorkspaceListProps {
  workspaces: Workspace[];
}

export const WorkspaceList = ({ workspaces }: WorkspaceListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {workspaces.map((workspace) => (
        <WorkspaceItem key={workspace.id} item={workspace} />
      ))}
      <CreateWorkspace />
    </div>
  );
};

export const WorkspaceListSkeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  );
};
