"use client";

import { ElementRef, useRef, useState } from "react";
import { Board } from "@prisma/client";
import { toast } from "sonner";

import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { updateBoard } from "@/actions/update-board";
import { useAction } from "@/hooks/use-action";

interface BoardTitleFormProps {
  data: Board;
}

export const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const { execute } = useAction(updateBoard, {
    onSuccess: (newData) => {
      toast.success(`Board "${newData.title}" updated!`);
      setTitle(newData.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [title, setTitle] = useState<string>(data.title);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({ title, id: data.id });
  };
  const onBlur = () => {
    formRef.current?.requestSubmit();
  };
  //from 6.31.57s
  if (isEditing) {
    return (
      <form
        ref={formRef}
        action={onSubmit}
        className="flex items-center gap-x-2">
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    );
  }
  return (
    <Button
      onClick={enableEditing}
      className="font-bold text-lg h-auto w-auto p-1 px-2"
      variant="transparent">
      {title}
    </Button>
  );
};
