import { ChangeEventHandler, useEffect, useState } from "react";
import { Label } from "@prisma/client";

import { FormInput } from "@/components/form/form-input";
import { defaultLabelColors } from "@/constants/default-label-colors";
import { LabelItem } from "./label-item";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { LabelColorGrid } from "./label-color-grid";

interface LabelEditProps {
  label?: Label;
  mode: "create" | "update" | undefined;
  exitEditing: () => void;
  createNewLabel: (color: string, title: string) => void;
  deleteExistingLabel: (labelId: string) => void;
  updateExistingLabel: (
    labelId: string,
    values: { title?: string; color?: string }
  ) => void;
}

export const LabelEdit = ({
  label,
  mode,
  createNewLabel,
  deleteExistingLabel,
  updateExistingLabel,
}: LabelEditProps) => {
  const [color, setColor] = useState<string | undefined>(label?.color);
  const [title, setTitle] = useState<string | null | undefined>(label?.title);
  useEffect(() => {
    if (mode === "create" && !label) {
      const randomColor =
        defaultLabelColors[
          Math.floor(Math.random() * defaultLabelColors.length)
        ].value;
      setColor(randomColor);
    }
  }, []);
  const handleColorChange = (color: string) => {
    setColor(color);
  };

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const onSubmit = () => {
    if (mode === "create" && color && title) {
      createNewLabel(color, title);
    } else if (mode === "update" && label) {
      updateExistingLabel(label.id, {
        title: title || undefined,
        color,
      });
    }
  };

  const handleDeleteLabel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (label) {
      deleteExistingLabel(label.id);
    }
  };

  return (
    <div className="flex flex-col  space-y-4">
      <LabelItem color={color} title={title} />
      <form className="flex flex-col  space-y-6" action={onSubmit}>
        <FormInput
          id="title"
          label="Title"
          type="text"
          defaultValue={label && label.title ? label.title : undefined}
          onChange={handleTitleChange}
        />
        <LabelColorGrid
          currentColor={color}
          handleColorChange={handleColorChange}
        />
        {mode === "create" ? (
          <FormSubmit variant="default">Create</FormSubmit>
        ) : (
          <div className="w-full flex justify-between">
            <FormSubmit variant="default">Save</FormSubmit>
            <Button
              size={"sm"}
              variant="destructive"
              onClick={handleDeleteLabel}>
              Delete
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};
