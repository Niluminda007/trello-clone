import { Suspense } from "react";

import { Separator } from "@/components/ui/separator";
import ActivityList from "./_components/activity-list";

import Info from "../_components/info";

const ActivityPage = async () => {
  return (
    <div className="w-full">
      <Info />
      <Separator className="my-2" />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  );
};

export default ActivityPage;
