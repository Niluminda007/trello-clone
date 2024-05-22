import { Toaster } from "sonner";

import { LayoutType } from "@/types/layout";
import ModalProvider from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";

const PlatformLayout = ({ children }: LayoutType) => {
  return (
    <QueryProvider>
      <Toaster />
      <ModalProvider />
      {children}
    </QueryProvider>
  );
};

export default PlatformLayout;
