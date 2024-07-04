import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import BoardList from "./_components/board-list";

interface WorkspaceIdPageProps {
  params: {
    wId: string;
  };
}

const WorkspaceIdPage = ({ params }: WorkspaceIdPageProps) => {
  return (
    <div className="w-full mb-20">
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList wId={params.wId} />
        </Suspense>
      </div>
    </div>
  );
};

export default WorkspaceIdPage;
