import { HelpCircle, User2 } from "lucide-react";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import Hint from "@/components/hint";
import FormPopOver from "@/components/form/form-popover";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@/auth";

interface BoardListProps {
  wId: string;
}

const BoardList = async ({ wId }: BoardListProps) => {
  const session = await auth();
  if (!session?.user.id || !session.user.id) {
    return redirect("/select-workspace");
  }

  const boards = await db.board.findMany({
    where: {
      AND: [
        { workspaceId: wId },
        { boardMemberships: { some: { userId: session.user.id } } },
      ],
      workspaceId: wId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Your Boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/b/${board.id}`}
            className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}>
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
            <p className="relative font-semibold text-white">{board.title}</p>
          </Link>
        ))}
        <FormPopOver sideOffset={10} side="right" workspaceId={wId}>
          <div
            role="button"
            className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition">
            <p className="text-sm">Create New Board</p>
            <span className="text-xs">Unlimited</span>
            <Hint
              sideOffset={40}
              description={`You can create unlimited boards`}>
              <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
            </Hint>
          </div>
        </FormPopOver>
      </div>
    </div>
  );
};

export default BoardList;

BoardList.Skeleton = function SkeletonBoardList() {
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
