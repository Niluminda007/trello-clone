import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { useShareBoardModal } from "@/hooks/use-share-board-modal";
import { X } from "lucide-react";
import { useParams } from "next/navigation";
import { BoardMemberForm } from "./board-member-form";
import { BoardShareLink } from "./board-share-link";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { BoardMembersList } from "./board-members-list";
import { BoardMemberDTO } from "@/types/user";

export const ShareBoardModal = () => {
  const id = useShareBoardModal((state) => state.id);
  const isOpen = useShareBoardModal((state) => state.isOpen);
  const handleClose = useShareBoardModal((state) => state.onClose);
  const params = useParams();
  const boardId = params.bId as string;

  const { data: members, isLoading } = useQuery<BoardMemberDTO[]>({
    queryKey: ["members", id],
    queryFn: () =>
      fetcher({ url: `/board/members`, method: "POST", data: { boardId } }),
    enabled: isOpen && !!id,
  });

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[90%] md:w-[800px] md:max-h-[900px] flex flex-col bg-zinc-900 border-none ">
        <DialogHeader>
          <DialogTitle className="text-lg text-white  font-semibold">
            Share board
          </DialogTitle>
        </DialogHeader>
        <DialogDescription hidden></DialogDescription>

        <DialogClose onClick={handleClose} className="absolute right-4 top-4 ">
          <X className="h-4 w-4 text-slate-100 transition ease-linear hover:text-slate-300 hover:scale-[1.1]" />
        </DialogClose>
        <BoardMemberForm />

        <BoardShareLink />
        {isLoading ? (
          <BoardMembersList.Skeleton />
        ) : (
          <BoardMembersList members={members ?? []} />
        )}
      </DialogContent>
    </Dialog>
  );
};
