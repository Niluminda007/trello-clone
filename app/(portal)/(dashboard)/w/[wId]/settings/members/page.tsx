import { MembersTable } from "./_components/member-table";
import { AddWorkspaceMember } from "./_components/add-workspace-member";

interface MembersPageProps {
  params: {
    wId: string;
  };
}

const MembersPage = ({ params }: MembersPageProps) => {
  return (
    <>
      <div className="hidden md:flex  w-full  flex-col space-y-6">
        <div className="flex-col space-y-4">
          <h1 className="text-neutral-800 text-lg md:text-3xl font-semibold">
            Members
          </h1>
          <span className="text-neutral-500 text-sm">
            View and manage workspace members
          </span>
        </div>
        <AddWorkspaceMember workspaceId={params.wId} />
        <MembersTable workspaceId={params.wId} />
      </div>
      <span className="md:hidden text-neutral-500 text-sm">
        You can view and manage worksapce members in the desktop mode
      </span>
    </>
  );
};

export default MembersPage;
