import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/user-avatar";
import { getUserByID } from "@/data/user";
import { getWorkspaceById } from "@/data/workspace";
import { cookies } from "next/headers";
import Link from "next/link";

const AcceptWorkspacePage = async () => {
  const workspaceId = cookies().get("invited-workspace-id")?.value;
  const workspace = await getWorkspaceById(workspaceId);
  const admin = await getUserByID(workspace?.adminId);
  const adminName = admin?.name;
  const sharedBoardWorkspaceTitle = workspace?.name;
  const accentColor = admin?.accentColor;

  return (
    <div className="w-full h-full bg-black flex justify-center items-center">
      {!workspace ? (
        <AcceptBoardPageSkeleton />
      ) : (
        <div className="p-10 bg-slate-100 rounded-lg shadow-lg flex flex-col items-center space-y-6">
          {adminName && sharedBoardWorkspaceTitle && (
            <p className="text-2xl text-slate-600 text-center">
              <strong>{adminName}</strong> shared{" "}
              <strong>{sharedBoardWorkspaceTitle}</strong> with you.
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
              Join {adminName} in collaborating on this workspace.
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

export default AcceptWorkspacePage;
