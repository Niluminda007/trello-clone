import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { defaultLabelColors } from "@/constants/default-label-colors";
import { cn } from "@/lib/utils";

interface LabelColorGridProps {
  currentColor: string | undefined;
  handleColorChange: (color: string) => void;
}

export const LabelColorGrid = ({
  currentColor,
  handleColorChange,
}: LabelColorGridProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <p className="text-xs font-semibold">Select a color</p>
      <div className="grid grid-cols-5  gap-x-2 gap-y-4">
        {defaultLabelColors.map((label, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger>
                <div
                  style={{ backgroundColor: label.value }}
                  className={cn(
                    "w-full h-8 cursor-pointer border-0 outline-0 transition ease-linear",
                    currentColor === label.value &&
                      "border-2 border-black boder-solid outline outline-2 outline-offset-2 outline-sky-500"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    handleColorChange(label.value);
                  }}
                />
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="h-6 px-2 py-4 flex items-center justify-center">
                <p className="text-xs ">{label.label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};
