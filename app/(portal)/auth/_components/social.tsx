"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";

import { signIn } from "next-auth/react";

export const Social = () => {
  const [, startTransition] = useTransition();

  const onClick = (provider: "google" | "github") => {
    startTransition(async () => {
      await signIn(provider);
    });
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size={"lg"}
        variant={"outline"}
        className="w-full"
        onClick={() => onClick("google")}>
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button
        size={"lg"}
        variant={"outline"}
        className="w-full"
        onClick={() => onClick("github")}>
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};
