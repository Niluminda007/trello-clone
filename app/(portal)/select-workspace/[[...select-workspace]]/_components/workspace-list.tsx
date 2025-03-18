"use client";

import { Workspace } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateWorkspace } from "./create-workspace";
import { useWorkspace } from "@/hooks/use-workspace";
import { useRouter } from "next/navigation";
import { useAction } from "@/hooks/use-action";
import { updateActiveWorkspace } from "@/actions/update-active-workspace";
import { generateInitials } from "@/lib/utils";
import { LoadingSpinner } from "@/components/loading-spinner";

interface WorkspaceListProps {
  workspaces: Workspace[];
}

export const WorkspaceList = ({ workspaces }: WorkspaceListProps) => {
  const { setActiveWorkspace } = useWorkspace();
  const router = useRouter();
  const { execute, isLoading } = useAction(updateActiveWorkspace, {
    onSuccess: (data) => {
      setActiveWorkspace(data);

      router.push(`/w/${data.id}`);
      router.refresh();
    },
  });
  const onClick = (id: string) => {
    execute({ currentWorkspace: id });
  };
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {workspaces.map(({ id, name, description }) => (
          <div
            role="button"
            onClick={() => onClick(id)}
            className="flex flex-col items-center cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-lg shadow-xl transform transition-transform hover:scale-105">
            <span className="w-24 h-24 flex items-center justify-center bg-white text-black text-3xl rounded-full uppercase mb-4">
              {generateInitials(name)}
            </span>
            <span className="text-2xl font-semibold">{name}</span>
            <span className="text-sm text-gray-200 mt-2">{description}</span>
          </div>
        ))}
        <CreateWorkspace />
      </div>
    </>
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
