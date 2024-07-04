"use client";

import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/user-button/logout-button";
import { generateInitials } from "@/lib/utils";

export const UserButton = () => {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-haspopup="true" aria-expanded="false">
        <Avatar className="w-[40px] h-[40px]">
          <AvatarImage
            src={user?.image || ""}
            alt={user?.name || "User Avatar"}
          />
          <AvatarFallback className="bg-sky-500">
            {user && user.name ? (
              <div className="w-full h-full flex justify-center items-center text-white text-xl">
                {generateInitials(user.name)}
              </div>
            ) : (
              <FaUser className="text-white" />
            )}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
