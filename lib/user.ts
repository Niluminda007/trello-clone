import { User } from "@prisma/client";
import { db } from "./db";

export const updateDbUserProperties = async (
  userId: string,
  properties: Partial<User>
): Promise<User | null> => {
  try {
    return await db.user.update({
      where: {
        id: userId,
      },
      data: properties,
    });
  } catch (error) {
    console.error("Error updating user properties:", error);
    return null;
  }
};
