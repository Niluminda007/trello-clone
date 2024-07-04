"use client";

import { ElementRef, useRef } from "react";
import { toast } from "sonner";

import { FormSubmit } from "@/components/form/form-submit";
import { FormInput } from "@/components/form/form-input";
import { createWorkspace } from "@/actions/create-workspace";
import { useAction } from "@/hooks/use-action";
import { useWorkspaceModal } from "@/hooks/use-workspace-modal";
import { useSession } from "next-auth/react";

export const WorkspaceForm = () => {
  const workspaceModal = useWorkspaceModal();
  const { execute, isLoading, fieldErrors } = useAction(createWorkspace, {
    onSuccess: (data) => {
      toast.success(`Workspace ${data.name} created`);
      formRef.current?.reset();
      workspaceModal.onClose();
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const formRef = useRef<ElementRef<"form">>(null);
  const nameRef = useRef<ElementRef<"input">>(null);
  const descriptionRef = useRef<ElementRef<"input">>(null);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(formRef.current as HTMLFormElement);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    execute({ name, description });
  };

  return (
    <div className="p-4 md:p-8 bg-white rounded-lg">
      <h1 className="text-gray-800 text-2xl md:text-3xl font-bold mb-6 text-center">
        Create a Workspace
      </h1>
      <form className="space-y-4" ref={formRef} onSubmit={onSubmit}>
        <div className="space-y-4">
          <FormInput
            id="name"
            ref={nameRef}
            label="Workspace Name"
            placeholder="Dream Team"
            errors={fieldErrors}
            disabled={isLoading}
          />
          <FormInput
            id="description"
            ref={descriptionRef}
            label="Add a Description"
            placeholder="Where dreams meet reality"
            errors={fieldErrors}
            disabled={isLoading}
          />
        </div>
        <FormSubmit
          variant="default"
          disabled={isLoading}
          className="w-full py-3 text-white bg-slate-600 hover:bg-slate-900 rounded-lg transition duration-200 ease-in-out">
          {isLoading ? "Creating..." : "Create Workspace"}
        </FormSubmit>
      </form>
    </div>
  );
};
