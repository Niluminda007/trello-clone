import { WorkspaceControl } from "./_components/workspace-control";

interface WorkspaceIdLayoutProps {
  children: React.ReactNode;
  params: {
    wId: string;
  };
}

const WorkspaceIdLayout = ({ children, params }: WorkspaceIdLayoutProps) => {
  return (
    <>
      <WorkspaceControl wId={params.wId} />
      {children}
    </>
  );
};

export default WorkspaceIdLayout;
