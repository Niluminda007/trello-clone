import Link from "next/link";
import { Rocket, CheckCircle, Users, Layout } from "lucide-react";

import { Button } from "@/components/ui/button";

const MarketingPage = () => {
  return (
    <div className="relative flex items-center justify-center flex-col bg-[#52057B] text-white min-h-screen p-6 overflow-hidden">
      <div className="absolute inset-0 opacity-50">
        <div className="absolute bg-gradient-to-r from-[#52057B] to-[#892CDC] h-full w-full"></div>
      </div>
      <div className="z-10 flex flex-col text-center justify-center items-center">
        <div className="mb-4 flex items-center justify-center border shadow-lg p-4 bg-black text-white rounded-full uppercase animate-pulse">
          <Rocket className="h-6 w-6 mr-2 animate-spin-slow" />
          Blast Off with Quanta
        </div>
        <h1 className="text-3xl md:text-6xl text-white mb-6 animate-fade-in">
          Organize Your Workflow with Quanta
        </h1>
        <div className="text-2xl md:text-4xl bg-gradient-to-r from-[#52057B] to-black text-white px-4 py-2 rounded-md pb-4 w-fit mx-auto animate-pulse">
          Maximize Efficiency, Minimize Effort
        </div>
      </div>
      <div className="z-10 text-center mt-8">
        <p className="text-sm md:text-xl text-white mt-4 max-w-xs md:max-w-2xl mx-auto animate-fade-in-delayed">
          Quanta helps you collaborate seamlessly, manage tasks effortlessly,
          and achieve new productivity heights. Join thousands of teams that
          have transformed their workflows with Quanta.
        </p>
      </div>
      <div className="z-10 flex flex-col md:flex-row mt-8 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex flex-col items-center p-4 bg-black rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300">
          <CheckCircle className="h-10 w-10 mb-2 animate-fade-in-slow" />
          <h3 className="text-xl font-semibold">Easy Task Management</h3>
          <p className="text-center text-sm">
            Create, assign, and track tasks effortlessly with Quanta's intuitive
            interface.
          </p>
        </div>
        <div className="flex flex-col items-center p-4 bg-black rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300">
          <Users className="h-10 w-10 mb-2 animate-fade-in-slow" />
          <h3 className="text-xl font-semibold">Team Collaboration</h3>
          <p className="text-center text-sm">
            Collaborate with your team in real-time, ensuring everyone stays on
            the same page.
          </p>
        </div>
        <div className="flex flex-col items-center p-4 bg-black rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300">
          <Layout className="h-10 w-10 mb-2 animate-fade-in-slow" />
          <h3 className="text-xl font-semibold">Customizable Workflows</h3>
          <p className="text-center text-sm">
            Tailor your workflows to fit your team's unique needs and maximize
            efficiency.
          </p>
        </div>
      </div>
      <Button
        className="mt-12 bg-white text-black hover:bg-[rgba(255,255,255,0.6)] z-10"
        size="lg"
        asChild>
        <Link href={"sign-up"}>Get Quanta</Link>
      </Button>
    </div>
  );
};

export default MarketingPage;
