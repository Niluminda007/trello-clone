"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { WorkspaceImage } from "@/components/workspace-image";
import { useWorkspace } from "@/hooks/use-workspace";

import { CreditCardIcon } from "lucide-react";

const Info = () => {
  const { activeWorkspace } = useWorkspace();
  if (!activeWorkspace) {
    return <Info.Skeleton />;
  }
  return (
    <div className="flex items-center gap-x-4 ">
      <div className="w-[60px] h-[60px] relative">
        <WorkspaceImage name={activeWorkspace.name} />
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-xl">{activeWorkspace?.name}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <CreditCardIcon className="h-3 w-3 mr-1" />
          {/* {!isPro ? "Free" : "Pro"} */}
        </div>
      </div>
    </div>
  );
};

export default Info;

Info.Skeleton = function SkeletonInfo() {
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Skeleton className="w-full h-full absolute" />
      </div>
      <div className="space-y-2">
        <Skeleton className="w-[200px] h-2 " />
        <div className="flex items-center">
          <Skeleton className="w-4 h-4 mr-2" />
          <Skeleton className="w-[100px] h-4" />
        </div>
      </div>
    </div>
  );
};
