import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@prisma/client";

interface LabelsProps {
  labels: Label[];
}

export const Labels = ({ labels }: LabelsProps) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-xs font-semibold text-neutral-700">Labels</h3>
      <div className="w-[70%] grid grid-cols-3 gap-2">
        {labels.map((label) => (
          <div
            key={`card_label_${label.id}`}
            className="flex items-center justify-center w-full h-4 rounded-sm"
            style={{ backgroundColor: label.color }}>
            <span className="text-xs text-white">{label.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

Labels.Skeleton = function LabelsSkeleton() {
  return (
    <div className="flex flex-col">
      <Skeleton className="bg-neutral-200 h-6 w-6" />
      <div className="w-[70%] grid grid-cols-3 gap-2">
        <Skeleton className="w-full h-4 rounded-sm bg-neutral-200" />
        <Skeleton className="w-full h-4 rounded-sm bg-neutral-200 " />
      </div>
    </div>
  );
};
