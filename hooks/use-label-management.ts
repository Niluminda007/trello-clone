import { useCallback, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useParams } from "next/navigation";

import { useCardModal } from "./use-card-modal";
import { ExtendedLabel } from "@/types/list-card";
import { fetcher } from "@/lib/fetcher";
import { Label } from "@prisma/client";
import { useAction } from "./use-action";
import { deleteLabel } from "@/actions/delete-label";
import { createLabel } from "@/actions/create-label";
import { updateLabel } from "@/actions/update-label";

export const useLabelManagement = () => {
  const cardId = useCardModal((state) => state.id!);
  const isOpen = useCardModal((state) => state.isOpen);
  const params = useParams();
  const boardId = params.bId as string;
  const queryClient = useQueryClient();

  const { data: labels, isLoading } = useQuery<ExtendedLabel[]>({
    queryKey: ["labels", cardId],
    queryFn: () =>
      fetcher({
        url: `/labels/fetch`,
        params: { cardId },
      }),
    enabled: isOpen && !!cardId,
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [mode, setMode] = useState<"create" | "update" | undefined>(undefined);
  const [editingLabel, setEditingLabel] = useState<Label | undefined>(
    undefined
  );

  const enterCreateMode = useCallback(() => {
    setIsEditing(true);
    setMode("create");
  }, []);
  const exitEditing = useCallback(() => {
    setIsEditing(false);
    setMode(undefined);
    setEditingLabel(undefined);
  }, []);
  const enterUpdateMode = useCallback((label: Label) => {
    setIsEditing(true);
    setMode("update");
    setEditingLabel(label);
  }, []);

  const { execute: createLabelExecute } = useAction(createLabel, {
    onSuccess: async () => {
      toast.success("Label created");
      await queryClient.invalidateQueries({ queryKey: ["labels", cardId] });
      await queryClient.invalidateQueries({
        queryKey: ["card-labels", cardId],
      });
      exitEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: deleteLabelExecute } = useAction(deleteLabel, {
    onSuccess: async (data) => {
      toast.success(`Label ${data.title} deleted`);
      await queryClient.invalidateQueries({ queryKey: ["labels", cardId] });
      await queryClient.invalidateQueries({
        queryKey: ["card-labels", cardId],
      });
      exitEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: updateLabelExecute } = useAction(updateLabel, {
    onSuccess: async (data) => {
      toast.success(`Label ${data.title} updated`);
      await queryClient.invalidateQueries({ queryKey: ["labels", cardId] });
      await queryClient.invalidateQueries({
        queryKey: ["card-labels", cardId],
      });
      exitEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const createNewLabel = (color: string, title: string) => {
    createLabelExecute({
      color,
      title,
      cardId,
      boardId,
    });
  };

  const deleteExistingLabel = (labelId: string) => {
    deleteLabelExecute({ labelId, boardId });
  };

  const updateExistingLabel = (
    labelId: string,
    values: { title?: string; color?: string }
  ) => {
    updateLabelExecute({ labelId, values, boardId });
  };

  return {
    labels,
    isLoading,
    isEditing,
    mode,
    editingLabel,
    enterCreateMode,
    exitEditing,
    enterUpdateMode,
    createNewLabel,
    deleteExistingLabel,
    updateExistingLabel,
  };
};
