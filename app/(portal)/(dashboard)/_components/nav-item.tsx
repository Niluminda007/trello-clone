"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Activity, Layout, Settings } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { WorkspaceImage } from "@/components/workspace-image";
import WorkspaceProfile from "@/components/workspace-profile";

export type Workspace = {
  id: string;
  name: string;
};

interface NavItemProps {
  isExpanded: boolean;
  isActive: boolean;
  workspace: Workspace;
  onExpand: (id: string) => void;
}

const NavItem = ({
  isExpanded,
  isActive,
  workspace,
  onExpand,
}: NavItemProps) => {
  const router = useRouter();
  const pathName = usePathname();

  const routes = [
    {
      label: "Boards",
      icon: <Layout className="h-4 w-4 mr-2" />,
      href: `/w/${workspace.id}`,
      childHrefs: [],
    },
    {
      label: "Activity",
      icon: <Activity className="h-4 w-4 mr-2" />,
      href: `/w/${workspace.id}/activity`,
      childHrefs: [],
    },
    {
      label: "Settings",
      icon: <Settings className="h-4 w-4 mr-2" />,
      href: `/w/${workspace.id}/settings`,
      childHrefs: [`/w/${workspace.id}/settings/members`],
    },
  ];

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <AccordionItem value={workspace.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(workspace.id)}
        className={cn(
          "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
          isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
        )}>
        {/* <div className="flex items-center gap-x-2">
          <WorkspaceImage name={workspace.name} />
          <span className="font-medium text-sm">{workspace.name}</span>
        </div> */}
        <WorkspaceProfile name={workspace.name} />
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-neutral-700 ">
        {routes.map((route) => {
          const isActiveRoute =
            pathName === route.href ||
            route.childHrefs.some((childRef) => pathName.startsWith(childRef));

          return (
            <Button
              key={route.href}
              size="sm"
              onClick={() => onClick(route.href)}
              className={cn(
                "w-full font-normal justify-start pl-10 mb-1",
                isActiveRoute && "bg-sky-500/10 text-sky-700"
              )}
              variant="ghost">
              {route.icon}
              {route.label}
            </Button>
          );
        })}
      </AccordionContent>
    </AccordionItem>
  );
};

export default NavItem;

NavItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className="flex items-center gap-x-2 ">
      <div className="w-10 h-10 relative shrink-0 ">
        <Skeleton className="h-full w-full absolute" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
};
