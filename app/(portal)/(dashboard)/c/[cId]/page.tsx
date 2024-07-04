"use client";

import { useCardModal } from "@/hooks/use-card-modal";
import { useEffect } from "react";

interface CardIdPageProps {
  params: {
    cId: string;
  };
}

const CardIdPage = ({ params }: CardIdPageProps) => {
  const cardModal = useCardModal();
  useEffect(() => {
    cardModal.onOpen(params.cId);
  }, []);
  return null;
};

export default CardIdPage;
