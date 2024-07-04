"use client";

import { LabelItem } from "./label-item";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useAction } from "@/hooks/use-action";
import { addCardLabel } from "@/actions/add-card-label";
import { toast } from "sonner";
import { useCardModal } from "@/hooks/use-card-modal";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ExtendedLabel } from "@/types/list-card";
import { Label } from "@prisma/client";

interface LabelActionProps {
  label: ExtendedLabel;
  updateLabel: (label: Label) => void;
}
export const LabelAction = ({ label, updateLabel }: LabelActionProps) => {
  const cardId = useCardModal((state) => state.id);
  const [checked, setChecked] = useState<boolean>(!!label.checked);
  const params = useParams<{ bId: string }>();
  const { execute } = useAction(addCardLabel, {
    onError: (error) => {
      toast.error(error);
    },
  });

  const queryClient = useQueryClient();
  const handleLabelSelect = async () => {
    if (label.id && cardId) {
      setChecked((prev) => !prev);
      execute({
        labelId: label.id,
        cardId: cardId,
        boardId: params.bId,
      });
      await queryClient.invalidateQueries({ queryKey: ["card", cardId] });
      await queryClient.invalidateQueries({
        queryKey: ["card-labels", cardId],
      });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <Checkbox
          className="w-4 h-4 text-neutral-700"
          id={`${label.id}_label_select`}
          onCheckedChange={handleLabelSelect}
          checked={checked}
        />
        <LabelItem title={label.title} color={label.color} />
        <Button
          size={"icon"}
          variant={"ghost"}
          className="flex items-center justify-center"
          onClick={() => updateLabel(label)}>
          <Edit className="w-4 h-4 text-neutral-700" />
        </Button>
      </div>
    </>
  );
};
