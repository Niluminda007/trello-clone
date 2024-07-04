"use client";

import { useState, useEffect } from "react";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import WorkspaceProfile from "@/components/workspace-profile";
import { useWorkspace } from "@/hooks/use-workspace";
import { useRouter } from "next/navigation";
import { useAction } from "@/hooks/use-action";
import { updateWorkspace } from "@/actions/update-workspace";
import { toast } from "sonner";

const SettingsProfilePage = () => {
  const { activeWorkspace: workspace } = useWorkspace();
  if (!workspace) {
    return null;
  }
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const router = useRouter();

  const initialName = workspace.name || "";
  const initialDescription = workspace.description || "";

  useEffect(() => {
    setIsSaveDisabled(true);
  }, [workspace]);

  const handleCancelProfileUpdate = () => {
    router.back();
  };

  const { execute, fieldErrors, isLoading } = useAction(updateWorkspace, {
    onSuccess: (data) => {
      toast.success(`Successfully updated ${data.name}`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    execute({ name, description, workspaceId: workspace.id });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    const name = event.currentTarget.elements.namedItem(
      "name"
    ) as HTMLInputElement;
    const description = event.currentTarget.elements.namedItem(
      "description"
    ) as HTMLInputElement;

    setIsSaveDisabled(
      name.value === initialName && description.value === initialDescription
    );
  };

  return (
    <div className="w-full flex flex-col space-y-6 p-2 md:p-6 bg-white rounded-lg">
      <div className="flex flex-col space-y-2">
        <h1 className="text-gray-900 text-lg md:text-4xl font-bold">
          Workspace Profile
        </h1>
        <span className="text-gray-600 text-base">
          Manage workspace profile
        </span>
      </div>
      <form
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit}
        onChange={handleInputChange}>
        <WorkspaceProfile name={workspace.name} />
        <FormInput
          type="text"
          className="w-full"
          id="name"
          label="Workspace Name"
          placeholder={workspace.name}
          defaultValue={workspace.name}
          errors={fieldErrors}
          disabled={isLoading}
        />
        <FormInput
          type="text"
          className="w-full"
          id="description"
          label="Workspace Description"
          placeholder={workspace.description || ""}
          defaultValue={workspace.description || ""}
          errors={fieldErrors}
          disabled={isLoading}
        />
        <div className="w-full flex items-center justify-end">
          <div className="flex space-x-2">
            <Button
              onClick={handleCancelProfileUpdate}
              size="lg"
              type="button"
              variant="ghost">
              Cancel
            </Button>
            <Button
              size="lg"
              type="submit"
              variant="default"
              disabled={isSaveDisabled || isLoading}>
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SettingsProfilePage;
