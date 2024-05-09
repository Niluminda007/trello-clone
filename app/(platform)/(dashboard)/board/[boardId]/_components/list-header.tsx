"use client";
import { useState, useRef, ElementRef } from "react";

import { List } from "@prisma/client";
import { useEventListener } from "usehooks-ts";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { updateList } from "@/actions/update-list";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ListOptions from "./list-options";

interface ListHeaderProps {
  data: List;
  onAddCard: () => void;
}

const ListHeader = ({ data, onAddCard }: ListHeaderProps) => {
  const router = useRouter();

  const [title, setTitle] = useState<string>(data.title);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

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

  const { execute, fieldErrors } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Renamed to ${data.title}`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const OnKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  const onSubmit = (formData: FormData) => {
    const newTitle = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    if (title === newTitle) {
      disableEditing();
    }
    execute({ title: newTitle, id, boardId });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  useEventListener("keydown", OnKeyDown);

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
      {isEditing ? (
        <form ref={formRef} action={onSubmit} className="flex-1 px-[2px]">
          <input hidden id="id" name="id" value={data.id} readOnly />
          <input
            hidden
            id="boardId"
            name="boardId"
            value={data.boardId}
            readOnly
          />
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            placeholder="Enter List title...."
            defaultValue={title}
            errors={fieldErrors}
            className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
          />
          <button type="submit" hidden />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent">
          {title}
        </div>
      )}
      <ListOptions data={data} onAddCard={onAddCard} />
    </div>
  );
};

export default ListHeader;
