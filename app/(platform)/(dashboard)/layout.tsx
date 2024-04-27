import { LayoutType } from "@/types/layout";
import React from "react";
import Navbar from "./_components/navbar";

const DashboardLayout = ({ children }: LayoutType) => {
  return (
    <div className="h-full">
      <Navbar />
      {children}
    </div>
  );
};

export default DashboardLayout;
