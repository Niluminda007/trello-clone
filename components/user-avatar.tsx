import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, generateInitials, getRandomColor } from "@/lib/utils";
import { FaUser } from "react-icons/fa";
import Image from "next/image";

interface UserAvatarProps {
  name: string;
  image?: string;
  email?: string;
  className?: string;
  accentColor?: string | null;
}

export const UserAvatar = ({
  name,
  image,
  className,
  email,
  accentColor,
}: UserAvatarProps) => {
  const bgColor = accentColor || getRandomColor();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {image ? (
            <Image
              height={"40"}
              width={"40"}
              alt="profile-img"
              src={image}
              className={cn("w-10 h-10 text-xl rounded-full", className)}
            />
          ) : (
            <div
              style={{ backgroundColor: bgColor }}
              className="w-10 h-10 flex justify-center rounded-full items-center text-white">
              {name ? (
                generateInitials(name)
              ) : (
                <FaUser className="text-white" />
              )}
            </div>
          )}
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="bg-zinc-800 border border-slate-200 rounded-md p-2 shadow-lg">
          <p className="text-xs text-slate-200">{name ? name : email}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
