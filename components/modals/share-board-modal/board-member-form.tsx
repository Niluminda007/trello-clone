import { addBoardMember } from "@/actions/add-board-member";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAction } from "@/hooks/use-action";
import { useShareBoardModal } from "@/hooks/use-share-board-modal";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BoardRole } from "@prisma/client";
import { useState } from "react";

export const BoardMemberForm = () => {
  const id = useShareBoardModal((state) => state.id!);
  const params = useParams();
  const queryClient = useQueryClient();

  const [selectedRole, setSelectedRole] = useState<BoardRole>(BoardRole.MEMBER);

  const { execute } = useAction(addBoardMember, {
    onSuccess: async (data) => {
      if (data) {
        toast.success(`${data} member added`);
      }

      await queryClient.invalidateQueries({ queryKey: ["members", id] });

      await queryClient.invalidateQueries({ queryKey: ["board-members", id] });
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (data: FormData) => {
    const email = data.get("membership-email") as string;
    execute({ email, role: selectedRole, boardId: params.bId as string });
  };

  return (
    <div className="w-full p-4 bg-gray-800 rounded-lg shadow-md">
      <form
        className="flex flex-col md:flex-row items-center md:space-x-4 space-y-2"
        action={onSubmit}>
        <Input
          id="membership-email"
          name="membership-email"
          type="email"
          placeholder="Enter member email"
          className="flex-1 border-neutral-600 focus-visible:border-none focus-visible:ring-sky-400"
          required
        />
        <div className="md:w-auto w-full flex space-x-4 justify-between">
          <Select
            onValueChange={(value) => setSelectedRole(value as BoardRole)}>
            <SelectTrigger className="w-40 text-secondary-foreground">
              <SelectValue
                id="member-role"
                defaultValue={selectedRole}
                placeholder="Select Role"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={BoardRole.MEMBER}>Member</SelectItem>
              <SelectItem value={BoardRole.ADMIN}>Admin</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="primary" type="submit">
            Share
          </Button>
        </div>
      </form>
    </div>
  );
};
