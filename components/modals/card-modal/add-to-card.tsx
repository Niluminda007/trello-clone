import { Skeleton } from "@/components/ui/skeleton";
import { LabelForm } from "./label-form";

export const AddToCard = () => {
  return (
    <div className="flex flex-col space-y-2 mt-2">
      <p className="text-xs font-semibold">Add to card</p>
      <LabelForm />
    </div>
  );
};

AddToCard.Skeleton = function AddToCardSkeleton() {
  return (
    <div className="flex flex-col space-y-2 mt-2">
      <Skeleton className="w-20 h-4  bg-neutral-200" />
      <Skeleton className="bg-neutral-200 h-8 w-full" />
    </div>
  );
};
