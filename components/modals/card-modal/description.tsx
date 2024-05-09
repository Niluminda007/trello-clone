"use client";

import { updateCard } from "@/actions/update-card";
import { FormSubmit } from "@/components/form/form-submit";
import FormTextarea from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { CardWithList } from "@/types/list-card";
import { useQueryClient } from "@tanstack/react-query";
import { AlignLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { useRef, useState, ElementRef } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface KeyboardEvent {
  key: string;
}

interface DescriptionProps {
  data: CardWithList;
}

const Description = ({ data }: DescriptionProps) => {
  const queryClient = useQueryClient();
  const params = useParams<{ boardId: string }>();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });
      toast.success(`Card ${data.title} updated`);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };
  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const description = formData.get("description") as string;

    execute({
      id: data.id,
      description,
      boardId: params.boardId,
    });
  };
  return (
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full ">
        <p className="font-semibold text-neutral-700 mb-2">Description</p>
        {isEditing ? (
          <form action={onSubmit} ref={formRef} className="space-y-2">
            <FormTextarea
              id="description"
              className="w-full mt-2"
              placeholder="Add a more detailed description"
              errors={fieldErrors}
              ref={textareaRef}
              defaultValue={data.description || undefined}
            />
            <div className="flex items-center gap-x-2">
              <FormSubmit>Save</FormSubmit>
              <Button
                type="button"
                onClick={disableEditing}
                size="sm"
                variant="ghost">
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <pre
            onClick={enableEditing}
            role="button"
            className="min-h-[78px] max-h-[600px] overflow-y-scroll bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
            style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
            {data.description || "Add a more detailed description"}
          </pre>
        )}
      </div>
    </div>
  );
};

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-[78px]  bg-neutral-200" />
      </div>
    </div>
  );
};

export default Description;
