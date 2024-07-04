// // "use client";

// // import { Skeleton } from "@/components/ui/skeleton";
// // import { UserAvatar } from "@/components/user-avatar";
// // import { fetcher } from "@/lib/fetcher";
// // import { BoardMemberDTO } from "@/types/user";
// // import { BoardRole } from "@prisma/client";
// // import { useQuery } from "@tanstack/react-query";
// // import { Crown } from "lucide-react";
// // import { ViewBoardMembers } from "./view-board-members";

// // interface BoardMembersProps {
// //   boardId: string;
// // }

// // export const BoardMembers = ({ boardId }: BoardMembersProps) => {
// //   const {
// //     data: members,
// //     isLoading,
// //     error,
// //   } = useQuery<BoardMemberDTO[]>({
// //     queryKey: ["board-members", boardId],
// //     queryFn: () =>
// //       fetcher({
// //         url: `/board/members`,
// //         method: "POST",
// //         data: {
// //           boardId,
// //         },
// //       }),
// //   });

// //   if (isLoading) {
// //     return <BoardMembersSkeleton />;
// //   }

// //   if (error) {
// //     return <div className="text-red-500">Error loading board members.</div>;
// //   }

// //   if (!members || members.length === 0) {
// //     return null;
// //   }

// //   const displayMemberCount = members.length > 5 ? members.length - 5 : 0;
// //   const trimmedMembers = members.slice(0, 5);

// //   return (
// //     <div className="max-w-[15rem] grid grid-cols-6 gap-1 items-center justify-center">
// //       {trimmedMembers.map(({ name, image, accentColor, role, email }) => (
// //         <div
// //           key={name}
// //           className="relative w-12 h-12 flex items-center justify-center">
// //           <UserAvatar
// //             name={name}
// //             image={image}
// //             className="w-8 h-8 text-sm"
// //             accentColor={accentColor}
// //             email={email}
// //           />
// //           {role === BoardRole.ADMIN && (
// //             <Crown
// //               className="absolute bottom-[10%] left-2 transform  w-4 h-4 text-yellow-500"
// //               aria-label="Admin"
// //             />
// //           )}
// //         </div>
// //       ))}
// //       {members.length > 5 && (
// //         <ViewBoardMembers
// //           members={members}
// //           displayMemberCount={displayMemberCount}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // const BoardMembersSkeleton = () => {
// //   return (
// //     <div className="grid grid-cols-6 gap-1">
// //       {Array.from({ length: 5 }).map((_, index) => (
// //         <Skeleton key={index} className="h-8 w-8 rounded-full bg-neutral-200" />
// //       ))}
// //     </div>
// //   );
// // };

// "use client";

// import { Skeleton } from "@/components/ui/skeleton";
// import { UserAvatar } from "@/components/user-avatar";
// import { fetcher } from "@/lib/fetcher";
// import { BoardMemberDTO } from "@/types/user";
// import { BoardRole } from "@prisma/client";
// import { useQuery } from "@tanstack/react-query";
// import { Crown } from "lucide-react";
// import { ViewBoardMembers } from "./view-board-members";

// interface BoardMembersProps {
//   boardId: string;
// }

// export const BoardMembers = ({ boardId }: BoardMembersProps) => {
//   const {
//     data: members,
//     isLoading,
//     error,
//   } = useQuery<BoardMemberDTO[]>({
//     queryKey: ["board-members", boardId],
//     queryFn: () =>
//       fetcher({
//         url: `/board/members`,
//         method: "POST",
//         data: {
//           boardId,
//         },
//       }),
//   });

//   if (isLoading) {
//     return <BoardMembersSkeleton />;
//   }

//   if (error) {
//     return <div className="text-red-500">Error loading board members.</div>;
//   }

//   if (!members || members.length === 0) {
//     return null;
//   }

//   const displayMemberCount = members.length > 5 ? members.length - 5 : 0;
//   const trimmedMembers = members.slice(0, 5);

//   return (
//     <div className="max-w-[15rem] grid grid-cols-6 gap-1 items-center justify-center">
//       {trimmedMembers.map(({ id, name, image, accentColor, role, email }) => (
//         <div
//           key={`b_mem${id}`}
//           className="relative w-12 h-12 flex items-center justify-center">
//           <UserAvatar
//             name={name}
//             image={image}
//             className="w-8 h-8 text-sm"
//             accentColor={accentColor}
//             email={email}
//           />
//           {role === BoardRole.ADMIN && (
//             <Crown
//               className="absolute bottom-[10%] left-2 transform w-4 h-4 text-yellow-500"
//               aria-label="Admin"
//             />
//           )}
//         </div>
//       ))}
//       {members.length > 5 && (
//         <ViewBoardMembers
//           members={members}
//           displayMemberCount={displayMemberCount}
//         />
//       )}
//     </div>
//   );
// };

// const BoardMembersSkeleton = () => {
//   return (
//     <div className="grid grid-cols-6 gap-1">
//       {Array.from({ length: 5 }).map((_, index) => (
//         <Skeleton key={index} className="h-8 w-8 rounded-full bg-neutral-200" />
//       ))}
//     </div>
//   );
// };
"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/user-avatar";
import { fetcher } from "@/lib/fetcher";
import { BoardMemberDTO } from "@/types/user";
import { BoardRole } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Crown } from "lucide-react";
import { ViewBoardMembers } from "./view-board-members";

interface BoardMembersProps {
  boardId: string;
}

export const BoardMembers = ({ boardId }: BoardMembersProps) => {
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

  const displayMemberCount = members.length > 5 ? members.length - 5 : 0;
  const trimmedMembers = members.slice(0, 5);

  return (
    <div className="max-w-[15rem] flex gap-2 items-center justify-center">
      {trimmedMembers.map(({ id, name, image, accentColor, role, email }) => (
        <div
          key={`b_mem${id}`}
          className="relative w-12 h-12 flex items-center justify-center">
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
