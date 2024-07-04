import { Board } from "@prisma/client";
import React from "react";
import { BoardTitleForm } from "./board-title-form";
import BoardOptions from "./board-options";
import { ShareBoard } from "./share-board";
import { BoardMembers } from "./board-members";

interface BoardNavbarProps {
  data: Board;
}

const BoardNavbar = async ({ data }: BoardNavbarProps) => {
  return (
    <div className="w-full h-14 z-[40] bg-black/50 absolute top-0 flex items-center px-6 gap-x-4 text-white">
      <BoardTitleForm data={data} />
      <div className="ml-auto flex gap-x-2 items-center justify-center">
        <BoardMembers boardId={data.id} />
        <ShareBoard />
        <BoardOptions id={data.id} />
      </div>
    </div>
  );
};

export default BoardNavbar;
