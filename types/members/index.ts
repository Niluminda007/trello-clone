import { BoardMembership, Membership, User } from "@prisma/client";

export type BoardMembershipWithUser = BoardMembership & { user: User };
