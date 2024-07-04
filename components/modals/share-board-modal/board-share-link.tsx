import { generateInviteLink } from "@/actions/create-invite-link";
import { deleteInviteLink } from "@/actions/delete-invite-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { fetcher } from "@/lib/fetcher";
import { extractToken } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Clipboard, Paperclip, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export const BoardShareLink = () => {
  const [inviteLink, setInviteLink] = useState<string | undefined>(undefined);
  const params = useParams();
  const boardId = params.bId as string;

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["board-invite", boardId],
    queryFn: () =>
      fetcher({ url: "/board/invite-link", method: "POST", data: { boardId } }),
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data?.inviteLink !== undefined) {
      setInviteLink(data.inviteLink);
    }
  }, [data]);

  const handleCopyLink = () => {
    if (inviteLink) {
      navigator.clipboard.writeText(inviteLink);
      toast.success("Invite link copied to clipboard");
    }
  };

  const { execute: executeDeleteInviteLink } = useAction(deleteInviteLink, {
    onSuccess: (data) => {
      setInviteLink(undefined);
      toast.success(data);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleDeleteLink = () => {
    if (inviteLink) {
      const token = extractToken(inviteLink);
      if (token) {
        executeDeleteInviteLink({ boardId, token });
      }
    }
  };

  const { execute: executeGenerateInviteLink } = useAction(generateInviteLink, {
    onSuccess: (data) => {
      setInviteLink(data);
      toast.success("Invite link generated successfully");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleGenerateInviteLink = () => {
    executeGenerateInviteLink({ boardId });
  };
  if (isLoading) {
    return <BoardShareLinkSkeleton />;
  }

  return (
    <div className="p-6 bg-zinc-800 rounded-lg shadow-lg transition-all duration-300">
      <div className="flex items-center mb-4">
        <Paperclip className="h-6 w-6 mr-4 text-sky-400" />
        <div className="flex-1">
          <span className="block text-sm font-medium text-gray-200">
            Share this board with a link
          </span>
          <Button
            variant="link"
            size="sm"
            className="p-0 text-sky-400 hover:underline"
            onClick={handleGenerateInviteLink}
            disabled={!!inviteLink}>
            Create Link
          </Button>
        </div>
      </div>
      <div
        className={`flex items-center transition-opacity duration-300 space-x-1 ${
          inviteLink ? "opacity-100 h-auto" : "opacity-0 h-0"
        }`}>
        <Input
          className="flex-1 h-10 bg-gray-700 border border-gray-600 rounded-l-lg text-gray-200 px-3"
          value={inviteLink || ""}
          readOnly
        />
        <div className="flex space-x-1">
          <Button
            className="h-10 bg-sky-500 hover:bg-sky-600 text-white rounded-r-lg"
            size="icon"
            variant="secondary"
            onClick={handleCopyLink}>
            <Clipboard className="h-5 w-5" />
          </Button>
          <Button
            className="h-10 bg-red-500 hover:bg-red-600 text-white rounded-r-lg"
            size="icon"
            variant="destructive"
            onClick={handleDeleteLink}>
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const BoardShareLinkSkeleton = () => {
  return (
    <div className="p-6 bg-zinc-800 rounded-lg shadow-lg transition-all duration-300">
      <div className="flex items-center mb-4">
        <Skeleton className="h-6 w-6 mr-4" />
        <div className="flex-1">
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
      <div className="flex items-center space-x-1">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-10" />
      </div>
    </div>
  );
};
