"use client";

import { toast } from "sonner";
import { useEffect, useCallback } from "react";

import { fetchWorkspace } from "@/actions/fetch-workspace";
import { useAction } from "@/hooks/use-action";
import { useWorkspace } from "@/hooks/use-workspace";
import { useWorkspaceList } from "@/hooks/use-memberships";
import { fetchWorkspacelist } from "@/actions/fetch-memberships";
import { updateActiveWorkspace } from "@/actions/update-active-workspace";

interface WorkspaceControlProps {
  wId: string;
}

export const WorkspaceControl = ({ wId }: WorkspaceControlProps) => {
  const { setActiveWorkspace } = useWorkspace();
  const { setWorkspaces } = useWorkspaceList();

  const { execute: executeMemberships } = useAction(fetchWorkspacelist, {
    onSuccess: (data) => {
      setWorkspaces(data);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute } = useAction(fetchWorkspace, {
    onSuccess: (data) => {
      setActiveWorkspace(data);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeupdateActiveWorkspace } = useAction(
    updateActiveWorkspace
  );

  const fetchWorkspaceCallback = useCallback(() => {
    execute({ workspaceId: wId });
    executeupdateActiveWorkspace({ currentWorkspace: wId });
  }, [wId]);

  const fetchMembershipsCallback = useCallback(() => {
    executeMemberships({});
  }, []);

  useEffect(() => {
    fetchWorkspaceCallback();
  }, [fetchWorkspaceCallback]);

  useEffect(() => {
    fetchMembershipsCallback();
  }, [fetchMembershipsCallback]);

  return null;
};
