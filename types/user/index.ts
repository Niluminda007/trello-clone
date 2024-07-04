import { BoardRole } from "@prisma/client";

export type BoardMemberDTO = {
  id: string;
  name: string;
  image: string;
  email: string;
  role: BoardRole;
  accentColor: string;
};
