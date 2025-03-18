import { notFound, redirect } from "next/navigation";

import { db } from "@/lib/db";

import { currentUser } from "@/lib/auth";
import BoardNavbar from "./_components/board-navbar";

export async function generateMetadata({
  params,
}: {
  params: { bId: string };
}) {
  const user = await currentUser();

  if (!user || !user.workspaceId) {
    return {
      title: "Board",
    };
  }

  try {
    const board = await db.board.findUnique({
      where: {
        id: params.bId,
        workspaceId: user.workspaceId,
      },
    });

    return {
      title: board?.title || "Board",
    };
  } catch (error) {
    console.error("Error fetching board:", error);
    return {
      title: "Board",
    };
  }
}

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { bId: string };
}) => {
  const user = await currentUser();
  if (!user || !user.workspaceId) {
    redirect("/select-workspace");
  }
  const board = await db.board.findFirst({
    where: {
      id: params.bId,
      workspaceId: user.workspaceId,
    },
  });

  if (!board) {
    notFound();
  }
  return (
    <div
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
      className="relative h-full bg-no-repeat bg-center bg-cover"
    >
      <BoardNavbar data={board} />
      <div className="absolute inset-0 bg-black/10" />
      <main className="relative pt-24 lg:pt-16 h-full">{children} </main>
    </div>
  );
};

export default BoardIdLayout;
