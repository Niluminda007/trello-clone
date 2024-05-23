import { SessionProvider } from "next-auth/react";

import { auth } from "@/auth";

interface ShopLayoutProps {
  children: React.ReactNode;
}

const ShopLayout = async ({ children }: ShopLayoutProps) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div className="h-full w-full flex flex-col gap-y-2 items-center justify-center bg-sky-500">
        {children}
      </div>
    </SessionProvider>
  );
};

export default ShopLayout;
