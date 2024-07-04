"use client";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AuditLog, Label } from "@prisma/client";

import { useCardModal } from "@/hooks/use-card-modal";
import { CardWithList } from "@/types/list-card";
import { fetcher } from "@/lib/fetcher";

import Header from "./header";
import Description from "./description";
import Actions from "./actions";
import Activity from "./activity";
import { AddToCard } from "./add-to-card";
import { Labels } from "./labels";

const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher({ url: `/cards/${id}` }),
    enabled: isOpen && !!id,
  });

  const { data: auditLogsData } = useQuery<AuditLog[]>({
    queryKey: ["card-logs", id],
    queryFn: () => fetcher({ url: `/cards/${id}/logs` }),
    enabled: isOpen && !!id,
  });

  const { data: cardLabels } = useQuery<Label[]>({
    queryKey: ["card-labels", id],
    queryFn: () =>
      fetcher({
        url: "/labels/fetch/card",
        method: "POST",
        data: { cardId: id },
      }),

    enabled: isOpen && !!id,
  });

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="absolute md:top-[30%] w-[80%] md:w-full">
        <DialogHeader>
          <DialogTitle>
            {!cardData ? <Header.Skeleton /> : <Header data={cardData} />}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription hidden></DialogDescription>

        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3 flex flex-col">
            {cardLabels && cardLabels.length > 0 && (
              <Labels labels={cardLabels} />
            )}
          </div>
          {!cardData ? <AddToCard.Skeleton /> : <AddToCard />}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {!cardData ? (
                <Description.Skeleton />
              ) : (
                <Description data={cardData} />
              )}
              {!auditLogsData ? (
                <Activity.Skeleton />
              ) : (
                <Activity items={auditLogsData} />
              )}
            </div>
          </div>
          {!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
