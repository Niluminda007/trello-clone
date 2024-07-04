import { BoardRole } from "@prisma/client";

const boardRoleInfo: Map<BoardRole, string> = new Map();

boardRoleInfo.set(BoardRole.ADMIN, "Admin of the board");
boardRoleInfo.set(BoardRole.MEMBER, "a member of the board");
boardRoleInfo.set(BoardRole.GUEST, "un-registered member");

export { boardRoleInfo };
