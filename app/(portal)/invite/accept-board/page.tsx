import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/user-avatar";
import { getBoardById } from "@/data/board";
import { cookies } from "next/headers";
import Link from "next/link";

const AcceptBoardPage = async () => {
  const boardId = cookies().get("invited-board-id")?.value;
  const board = await getBoardById(boardId);
  const adminName = board?.boardMemberships[0].user.name;
  const sharedBoardTitle = board?.title;
  const accentColor = board?.boardMemberships[0].user.accentColor;

  return (
    <div className="w-full h-full bg-black flex justify-center items-center">
      {!board ? (
        <AcceptBoardPageSkeleton />
      ) : (
        <div className="p-10 bg-slate-100 rounded-lg shadow-lg flex flex-col items-center space-y-6">
          {adminName && sharedBoardTitle && (
            <p className="text-2xl text-slate-600 text-center">
              <strong>{adminName}</strong> shared{" "}
              <strong>{sharedBoardTitle}</strong> with you.
            </p>
          )}
          {adminName && (
            <UserAvatar
              className="w-24 h-24 text-2xl"
              name={adminName}
              accentColor={accentColor}
            />
          )}
          {adminName && (
            <p className="text-lg text-slate-600 text-center">
              Join {adminName} in collaborating on this board.
            </p>
          )}
          <div className="flex justify-center space-x-4">
            <Link href={"/auth/register"}>
              <Button variant={"default"} size={"lg"} className="text-sm">
                Sign Up
              </Button>
            </Link>
            <Link href={"/auth/login"}>
              <Button variant={"default"} size={"lg"} className="text-sm">
                Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

const AcceptBoardPageSkeleton = () => {
  return (
    <div className="w-full flex flex-col items-center space-y-6 p-10">
      <Skeleton className="w-3/4 h-8 bg-neutral-400 rounded-md" />
      <Skeleton className="w-24 h-24 bg-neutral-400 rounded-full" />
      <Skeleton className="w-3/4 h-6 bg-neutral-400 rounded-md" />
      <div className="flex justify-center space-x-4">
        <Skeleton className="w-32 h-10 bg-neutral-400 rounded-md" />
        <Skeleton className="w-32 h-10 bg-neutral-400 rounded-md" />
      </div>
    </div>
  );
};

export default AcceptBoardPage;
