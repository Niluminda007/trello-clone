import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserAvatar } from "@/components/user-avatar";
import { BoardMemberDTO } from "@/types/user";
import { boardRoleInfo } from "@/constants/role-info";
import { Skeleton } from "@/components/ui/skeleton";

interface BoardMembersListProps {
  members: BoardMemberDTO[];
}

export const BoardMembersList = ({ members }: BoardMembersListProps) => {
  return (
    <div className="w-full h-[400px] max-h-[400px] overflow-y-auto flex flex-col space-y-2 p-2">
      {members.map(({ id, name, email, image, role, accentColor }) => (
        <div
          key={id}
          className=" flex items-center space-x-4 p-2 bg-zinc-800 rounded-md justify-between ">
          <UserAvatar
            key={id}
            name={name}
            image={image}
            className="w-10 h-10"
            accentColor={accentColor}
          />
          <div className="md:flex-grow max-w-[100px] md:max-w-full flex flex-col">
            <span className="w-full text-white text-sm truncate">{name}</span>
            <small className="w-full text-neutral-500 text-xs truncate">
              {email}
            </small>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="w-20 flex items-center justify-center text-sm cursor-default px-4 py-2 bg-neutral-100 hover:bg-neutral-300 transition ease-linear rounded-md ">
                  {role}
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="h-6 px-2 py-4 flex items-center justify-center">
                <p className="text-xs">{boardRoleInfo.get(role)}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ))}
    </div>
  );
};

BoardMembersList.Skeleton = function BoardMembersListSkeleton() {
  return (
    <div className="w-full h-[400px] max-h-[400px] flex flex-col space-y-2 p-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4 p-2 rounded-md">
          <Skeleton className="w-10 h-10 bg-neutral-300" />
          <div className="flex-grow flex flex-col space-y-1">
            <Skeleton className="h-4 w-60 bg-neutral-300" />
            <Skeleton className="h-4 w-16 bg-neutral-300" />
          </div>
          <Skeleton className="h-10 w-20 bg-neutral-300" />
        </div>
      ))}
    </div>
  );
};
