import Logo from "@/components/logo";
import { UserButton } from "@/components/user-button";
import MobileSidebar from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <div className=" z-[99999] top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex justify-between items-center">
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
      </div>
      <UserButton />
    </div>
  );
};
