"use client";

import { Workspace } from "@prisma/client";
import { generateInitials } from "@/lib/utils";
import { useWorkspace } from "@/hooks/use-workspace";
import { useRouter } from "next/navigation";
import { useAction } from "@/hooks/use-action";
import { updateActiveWorkspace } from "@/actions/update-active-workspace";
import { LoadingSpinner } from "@/components/loading-spinner";

interface WorkspaceItemProps {
  item: Workspace;
}

export const WorkspaceItem = ({
  item: { id, name, description },
}: WorkspaceItemProps) => {
  const { setActiveWorkspace } = useWorkspace();
  const router = useRouter();
  const { execute, isLoading } = useAction(updateActiveWorkspace, {
    onSuccess: (data) => {
      setActiveWorkspace(data);

      router.push(`/w/${id}`);
      router.refresh();
    },
  });
  const onClick = () => {
    execute({ currentWorkspace: id });
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <button
        disabled={isLoading}
        onClick={onClick}
        className="flex flex-col items-center cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-lg shadow-xl transform transition-transform hover:scale-105">
        <span className="w-24 h-24 flex items-center justify-center bg-white text-black text-3xl rounded-full uppercase mb-4">
          {generateInitials(name)}
        </span>
        <span className="text-2xl font-semibold">{name}</span>
        <span className="text-sm text-gray-200 mt-2">{description}</span>
      </button>
    </>
  );
};
