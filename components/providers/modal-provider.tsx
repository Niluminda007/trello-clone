"use client";

import { useEffect, useState } from "react";

import CardModal from "@/components/modals/card-modal";

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
    </>
  );
};

export default ModalProvider;
