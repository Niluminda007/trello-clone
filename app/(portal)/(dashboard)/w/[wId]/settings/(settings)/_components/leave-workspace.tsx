import { leaveWorkspace } from "@/actions/leave-workspace";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface LeaveWorkspaceProps {
  workspaceId: string;
}

export const LeaveWorkspace = ({ workspaceId }: LeaveWorkspaceProps) => {
  const { execute, isLoading } = useAction(leaveWorkspace, {
    onSuccess: (data) => {
      toast.success(`Successfully left workspace ${data.name}`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleLeaveWorkspace = () => {
    execute({ workspaceId });
  };

  return (
    <div className="flex flex-col space-y-4">
      <p className="text-lg font-medium text-gray-900">Danger</p>
      <Separator orientation="horizontal" className="mb-4" />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            disabled={isLoading}
            className="w-32 bg-transparent border text-red-500 border-red-500 border-solid hover:bg-red-700 transition ease-linear hover:text-neutral-100 px-20 hover:scale-110">
            Leave Workspace
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Do you really want to leave this workspace?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove you
              from the workspace. If you are an admin and the only one, this
              will delete the workspace.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLeaveWorkspace}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
