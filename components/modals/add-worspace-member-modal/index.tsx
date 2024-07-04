import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useParams } from "next/navigation";
import { WorkspaceMemberForm } from "./workspace-member-form";
import { WorkspaceShareLink } from "./workspace-share-link";
import { useAddWorkspaceMemberModal } from "@/hooks/use-add-workspace-member-modal";

export const AddWorkspaceMemberModal = () => {
  const isOpen = useAddWorkspaceMemberModal((state) => state.isOpen);
  const handleClose = useAddWorkspaceMemberModal((state) => state.onClose);
  const params = useParams();

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[800px] max-h-[900px] flex flex-col bg-zinc-900 border-none ">
        <DialogHeader>
          <DialogTitle className="text-lg text-white  font-semibold">
            Add Member
          </DialogTitle>
        </DialogHeader>
        <DialogDescription hidden></DialogDescription>
        <DialogClose onClick={handleClose} className="absolute right-4 top-4 ">
          <X className="h-4 w-4 text-slate-100 transition ease-linear hover:text-slate-300 hover:scale-[1.1]" />
        </DialogClose>
        <WorkspaceMemberForm />

        <WorkspaceShareLink />
      </DialogContent>
    </Dialog>
  );
};
