"use client";

import { Button } from "@/components/ui/button";
import { useShareBoardModal } from "@/hooks/use-share-board-modal";
import { UserPlus2 } from "lucide-react";
import { useParams } from "next/navigation";

export const ShareBoard = () => {
  const params = useParams();
  const shareBoardModal = useShareBoardModal();
  const handleShareBoard = () => {
    shareBoardModal.onOpen(params.bId as string);
  };
  return (
    <Button
      variant={"secondary"}
      className="flex justify-center items-center"
      onClick={handleShareBoard}>
      <UserPlus2 className="h-4 w-4 text-black" />
      <span className="ml-2 font-semibold text-sm">Share</span>
    </Button>
  );
};
