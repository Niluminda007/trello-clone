"use client";

import { logOut } from "@/actions/log-out";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

const TestPage = () => {
  const user = useCurrentUser();

  const onClick = () => {
    logOut();
  };
  return (
    <div className="w-full h-full bg-yellow-700 flex flex-col">
      {user && <p>{JSON.stringify(user)}</p>}
      <Button size={"lg"} variant={"destructive"} onClick={onClick}>
        LogOut
      </Button>
    </div>
  );
};

export default TestPage;
