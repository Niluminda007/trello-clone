import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "@/components/logo";

const NavBar = () => {
  return (
    <div className="fixed z-[9999] top-0 w-full h-20 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size={"sm"} variant="outline" asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button size={"sm"} asChild>
            <Link href="/auth/register">Get Quanta for free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
