import Link from "next/link";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { Rocket } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const headingFont = localFont({
  src: "../../public/fonts/font.woff2",
});
const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div
        className={cn(
          "flex items-center justify-center flex-col",
          headingFont.className
        )}>
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-black text-white rounded-full uppercase">
          <Rocket className="h-6 w-6 mr-2" />
          Blast Off with TaskVista
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
          Elevate Your Team's Performance
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-[#fbc403] to-black text-white px-4 p-2 rounded-md pb-4 w-fit">
          Maximize Productivity
        </div>
      </div>
      <div
        className={cn(
          "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
          textFont.className
        )}>
        Collaborate seamlessly, streamline projects, and achieve unprecedented
        productivity levels. From corporate skyscrapers to cozy home offices,
        TaskVista empowers your team to soar to new heights of success.
      </div>
      <Button className="mt-6" size="lg" asChild>
        <Link href={"sign-up"}>Get TaskVista</Link>
      </Button>
    </div>
  );
};

export default MarketingPage;
