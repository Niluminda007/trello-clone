import { deleteBoard } from "@/actions/delete-board";
import { FormDeleteButton } from "./form-deleteButton";

interface BoardProps {
  title: string;
  id: string;
}

export const Board = ({ id, title }: BoardProps) => {
  const deleteBoardWithId = deleteBoard.bind(null, id);
  return (
    <form action={deleteBoardWithId} className="flex items-center gap-x-2 ">
      <p> Board.title: {title}</p> <FormDeleteButton />
    </form>
  );
};
