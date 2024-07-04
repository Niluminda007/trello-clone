import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import ListContainer from "./_components/list-container";
import { currentUser } from "@/lib/auth";

interface BoardIdPageProps {
  params: {
    bId: string;
  };
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
  const user = await currentUser();
  if (!user || !user.workspaceId) {
    redirect("/select-workspace");
  }
  const lists = await db.list.findMany({
    where: {
      boardId: params.bId,
      board: {
        workspaceId: user.workspaceId,
      },
    },
    include: {
      cards: {
        include: {
          cardLabels: {
            include: {
              label: true,
            },
          },
        },
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });
  return (
    <div className="p-4 h-full overflow-x-auto">
      <ListContainer boardId={params.bId} data={lists} />
    </div>
  );
};

export default BoardIdPage;
