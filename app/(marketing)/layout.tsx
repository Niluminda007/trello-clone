import React from "react";
import { LayoutType } from "@/types/layout";
import NavBar from "./_components/navbar";
import Footer from "./_components/footer";

const MarketingLayout = ({ children }: LayoutType) => {
  return (
    <div className="h-full bg-slate-100">
      <NavBar />
      <main className=" bg-slate-100">{children}</main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
