"use client";

import { ElementRef, useRef } from "react";
import { ChevronLeft, X } from "lucide-react";

import {
  PopOverClose,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LabelEdit } from "./label-edit";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { LabelAction } from "./label-action";
import { useLabelManagement } from "@/hooks/use-label-management";

interface LabelFormPopOverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

const LabelSkeleton = () => {
  return (
    <div className="flex flex-col space-y-2">
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};

export const LabelFormPopOver = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
}: LabelFormPopOverProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const {
    labels,
    isLoading,
    mode,
    editingLabel,
    isEditing,
    enterCreateMode,
    enterUpdateMode,
    exitEditing,
    createNewLabel,
    deleteExistingLabel,
    updateExistingLabel,
  } = useLabelManagement();
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3 pointer-events-auto"
        side={side}
        sideOffset={sideOffset}>
        <div className="flex w-full items-center justify-between mb-4">
          <Button
            size={"sm"}
            variant={"transparent"}
            className={cn(
              "h-auto w-auto p-2 text-neutral-600 bg-transparent transition ease-linear hover:bg-[hsl(0,0%,96.1%)]",
              !isEditing && "opacity-[0!important]"
            )}
            onClick={exitEditing}
            disabled={!isEditing}>
            <ChevronLeft />
          </Button>
          <h3 className="text-sm font-medium text-center flex items-center justify-center">
            Labels
          </h3>
          <PopOverClose ref={closeRef}>
            <Button
              className="h-auto w-auto p-2 text-neutral-600"
              variant="ghost">
              <X className="h-4 w-4" />
            </Button>
          </PopOverClose>
        </div>
        {!isEditing ? (
          <>
            {isLoading && <LabelSkeleton />}
            {!isLoading && labels && labels.length > 0 && (
              <div className="flex flex-col space-y-4 pointer-events-auto">
                <div className="max-h-80 overflow-y-scroll flex flex-col space-y-2">
                  {labels.map((label) => (
                    <LabelAction
                      key={label.id}
                      label={label}
                      updateLabel={enterUpdateMode}
                    />
                  ))}
                </div>
                <Button
                  variant={"default"}
                  className="w-full px-4 py-2"
                  onClick={enterCreateMode}>
                  Create new Label
                </Button>
              </div>
            )}
            {!isLoading && (!labels || labels.length === 0) && (
              <p>No labels available.</p>
            )}
          </>
        ) : (
          <LabelEdit
            mode={mode}
            label={editingLabel}
            exitEditing={exitEditing}
            createNewLabel={createNewLabel}
            deleteExistingLabel={deleteExistingLabel}
            updateExistingLabel={updateExistingLabel}
          />
        )}
      </PopoverContent>
    </Popover>
  );
};
