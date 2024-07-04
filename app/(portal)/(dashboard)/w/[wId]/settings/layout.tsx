"use client";

import { useWorkspace } from "@/hooks/use-workspace";
import { Separator } from "@/components/ui/separator";
import { Sidebar } from "./_components/sidebar";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  const { activeWorkspace } = useWorkspace();

  if (!activeWorkspace) {
    return null;
  }
  return (
    <div className="max-w-sm md:max-w-full min-w-full  bg-white shadow-lg px-2 md:px-8 py-6 md:py-10 flex space-x-2 md:space-x-4">
      <Sidebar workspace={activeWorkspace} />
      <Separator orientation="vertical" />
      <div className="flex-1">{children}</div>
    </div>
  );
};
2;
export default SettingsLayout;
