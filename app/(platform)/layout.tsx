import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";

import { LayoutType } from "@/types/layout";
import ModalProvider from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";

const PlatformLayout = ({ children }: LayoutType) => {
  return (
    <ClerkProvider>
      <QueryProvider>
        <Toaster />
        <ModalProvider />
        {children}
      </QueryProvider>
    </ClerkProvider>
  );
};

export default PlatformLayout;
