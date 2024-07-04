import { Toaster } from "sonner";
import { LayoutType } from "@/types/layout";

import ModalProvider from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const PortalLayout = async ({ children }: LayoutType) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <QueryProvider>
        <Toaster />
        <ModalProvider />
        {children}
      </QueryProvider>
    </SessionProvider>
  );
};

export default PortalLayout;
