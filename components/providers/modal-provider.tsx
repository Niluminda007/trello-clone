"use client";

import { useEffect, useState } from "react";

import CardModal from "@/components/modals/card-modal";
import { WorkspaceModal } from "../modals/workspace-modal";
import { ShareBoardModal } from "../modals/share-board-modal";
import { AddWorkspaceMemberModal } from "../modals/add-worspace-member-modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CardModal />
      <ShareBoardModal />
      <AddWorkspaceMemberModal />
      <WorkspaceModal />
    </>
  );
};

export default ModalProvider;
