import { LayoutType } from "@/types/layout";
import React from "react";
import OrgControl from "./_components/org-control";

const OrganizationIdLayout = ({ children }: LayoutType) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default OrganizationIdLayout;
