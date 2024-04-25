import React from "react";
import { LayoutType } from "@/types/layout";
import { ClerkProvider } from "@clerk/nextjs";

const PlatformLayout = ({ children }: LayoutType) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default PlatformLayout;
