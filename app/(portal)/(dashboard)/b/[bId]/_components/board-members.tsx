"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/user-avatar";
import { fetcher } from "@/lib/fetcher";
import { BoardMemberDTO } from "@/types/user";
import { BoardRole } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Crown } from "lucide-react";
import { ViewBoardMembers } from "./view-board-members";
import useMediaQuery from "@/hooks/use-mediaQuery";

interface BoardMembersProps {
  boardId: string;
}

export const BoardMembers = ({ boardId }: BoardMembersProps) => {
  const { isMobile, isTablet, isTabletLandscape, isDesktop } = useMediaQuery();
  const {
    data: members,
    isLoading,
    error,
  } = useQuery<BoardMemberDTO[]>({
    queryKey: ["board-members", boardId],
    queryFn: () =>
      fetcher({
        url: `/board/members`,
        method: "POST",
        data: { boardId },
      }),
  });

  if (isLoading) {
    return <BoardMembersSkeleton />;
  }

  if (error) {
    return <div className="text-red-500">Error loading board members.</div>;
  }

  if (!members || members.length === 0) {
    return null;
  }

  const MEMBER_DISPLAY_RESPONSIVE = {
    sm: 1,
    md: 2,
    lg: 3,
  };

  const screenSize = isMobile
    ? "sm"
    : isTablet || isTabletLandscape
    ? "md"
    : isDesktop
    ? "lg"
    : "lg";

  const MAX_MEMBER_DISPLAY_COUNT = MEMBER_DISPLAY_RESPONSIVE[screenSize] || 4;

  const displayMemberCount = Math.max(
    members.length - MAX_MEMBER_DISPLAY_COUNT,
    0
  );
  const trimmedMembers = members.slice(0, MAX_MEMBER_DISPLAY_COUNT);

  return (
    <div className="max-w-[15rem] lg:max-w-fit flex lg:gap-2 items-center justify-center">
      {trimmedMembers.map(({ id, name, image, accentColor, role, email }) => (
        <div
          key={`b_mem${id}`}
          className="relative w-12 h-12 flex items-center justify-center"
        >
          <UserAvatar
            name={name}
            image={image}
            className="w-8 h-8 text-sm"
            accentColor={accentColor}
            email={email}
          />
          {role === BoardRole.ADMIN && (
            <Crown
              className="absolute bottom-[10%] left-2 transform w-4 h-4 text-yellow-500"
              aria-label="Admin"
            />
          )}
        </div>
      ))}
      {members.length > 5 && (
        <ViewBoardMembers
          members={members}
          displayMemberCount={displayMemberCount}
        />
      )}
    </div>
  );
};

const BoardMembersSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="h-8 w-8 rounded-full bg-neutral-200" />
      ))}
    </div>
  );
};
