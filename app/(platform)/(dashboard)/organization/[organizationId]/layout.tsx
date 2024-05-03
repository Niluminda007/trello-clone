import { auth } from "@clerk/nextjs/server";
import { startCase } from "lodash";

import { LayoutType } from "@/types/layout";
import OrgControl from "./_components/org-control";

export async function generateMetadata() {
  const { orgSlug } = auth();
  return {
    title: startCase(orgSlug || "organization"),
  };
}

const OrganizationIdLayout = ({ children }: LayoutType) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default OrganizationIdLayout;
