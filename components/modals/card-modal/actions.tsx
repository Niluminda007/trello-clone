"use client";

import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types/list-card";
import { useAction } from "@/hooks/use-action";
import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import { useCardModal } from "@/hooks/use-card-modal";

interface ActionsProps {
  data: CardWithList;
}

const Actions = ({ data }: ActionsProps) => {
  const params = useParams<{ boardId: string }>();
  const cardModal = useCardModal();

  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast.success(`Card ${data.title} copied`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success(`Card ${data.title} deleted`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );
  const onCopy = () => {
    executeCopyCard({ id: data.id, boardId: params.boardId });
  };
  const onDelete = () => {
    executeDeleteCard({ id: data.id, boardId: params.boardId });
  };

  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        disabled={isLoadingCopy}
        className="w-full justify-start"
        variant="gray"
        size={"inline"}
        onClick={onCopy}>
        <Copy className="w-4 h-4 mr-2" />
        Copy
      </Button>
      <Button
        className="w-full justify-start"
        variant="gray"
        size={"inline"}
        disabled={isLoadingDelete}
        onClick={onDelete}>
        <Trash className="w-4 h-4 mr-2" />
        Delete
      </Button>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4  bg-neutral-200" />
      <Skeleton className="w-full h-8  bg-neutral-200" />
      <Skeleton className="w-full h-8  bg-neutral-200" />
    </div>
  );
};

export default Actions;
