import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const useCurrentUser = () => {
  const { data, update } = useSession();
  useEffect(() => {
    update();
  }, []);
  return data?.user;
};
