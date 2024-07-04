import { cn } from "@/lib/utils";

interface LabelItemProps {
  title: string | null | undefined;
  color?: string;
}

export const LabelItem = ({ title, color }: LabelItemProps) => {
  return (
    <div
      className={cn(
        "w-[200px] h-8 flex items-center justify-center rounded-sm",
        color === "#000000" && "text-white"
      )}
      style={{ backgroundColor: color }}>
      <p className="text-sm font-semibold">{title}</p>
    </div>
  );
};
