import { LabelFormPopOver } from "./label-form-popover";
import { Button } from "@/components/ui/button";

import { TagIcon } from "lucide-react";

export const LabelForm = () => {
  return (
    <LabelFormPopOver sideOffset={10} side="bottom">
      <Button className="w-full justify-start" variant="gray" size={"inline"}>
        <TagIcon className="w-4 h-4 mr-2" />
        Labels
      </Button>
    </LabelFormPopOver>
  );
};
