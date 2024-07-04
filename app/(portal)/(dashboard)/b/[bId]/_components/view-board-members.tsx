import { BoardMemberDTO } from "@/types/user";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserAvatar } from "@/components/user-avatar";
import { BoardRole } from "@prisma/client";
import { Crown } from "lucide-react";

interface ViewBoardMembersProps {
  members: BoardMemberDTO[];
  displayMemberCount: number;
}

export const ViewBoardMembers = ({
  members,
  displayMemberCount,
}: ViewBoardMembersProps) => {
  const boardAdmins = members.filter(
    (member) => member.role === BoardRole.ADMIN
  );
  const boardMembers = members.filter(
    (member) => member.role === BoardRole.MEMBER
  );
  const guestMembers = members.filter(
    (member) => member.role === BoardRole.GUEST
  );

  return (
    <Popover>
      <PopoverTrigger>
        <div
          className="w-12 h-12 flex items-center justify-center"
          role="button"
          aria-label="View Board Members">
          <span className="w-8 h-8 flex items-center justify-center rounded-full text-sm text-white bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 cursor-pointer shadow-lg">
            {`+${displayMemberCount}`}
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="min-w-64 bottom-10 bg-zinc-800 rounded-lg shadow-xl p-4 space-y-6"
        onOpenAutoFocus={(e) => e.preventDefault()}>
        <h3 className="text-slate-200 text-lg font-semibold border-b pb-2">
          Board Members
        </h3>
        <div>
          <h4 className="text-sm text-slate-200 mb-2">Admins</h4>
          <div className="w-full flex flex-wrap gap-2">
            {boardAdmins.map(
              ({ name, image, accentColor, email, role }, index) => (
                <div
                  key={index}
                  className="relative w-12 h-12 flex items-center justify-center">
                  <UserAvatar
                    name={name}
                    image={image}
                    className="w-8 h-8 text-sm"
                    accentColor={accentColor}
                    email={email}
                  />

                  <Crown
                    className="absolute bottom-[10%] left-2 transform w-4 h-4 text-yellow-500"
                    aria-label="Admin"
                  />
                </div>
              )
            )}
          </div>
        </div>
        <div className="w-full flex flex-col space-y-4">
          <div>
            <h4 className="text-sm text-slate-200 mb-2">Members</h4>
            <div className="w-full flex flex-wrap gap-2">
              {boardMembers.map(
                ({ name, image, accentColor, email }, index) => (
                  <UserAvatar
                    key={index}
                    className="w-10 h-10 text-sm"
                    name={name}
                    image={image}
                    accentColor={accentColor}
                    email={email}
                  />
                )
              )}
            </div>
          </div>
          <div>
            <h4 className="text-sm text-slate-200 mb-2">Guests</h4>
            <div className="w-full flex flex-wrap gap-2">
              {guestMembers.map(
                ({ name, image, accentColor, email }, index) => (
                  <UserAvatar
                    key={index}
                    className="w-10 h-10 text-sm"
                    name={name}
                    image={image}
                    accentColor={accentColor}
                    email={email}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
