import { LayoutType } from "@/types/layout";
import React from "react";

const ClerkLayout = ({ children }: LayoutType) => {
  return (
    <div className="h-full flex items-center justify-center">{children}</div>
  );
};

export default ClerkLayout;
