import Image from "next/image";

export const AuthBackground = () => {
  return (
    <div className=" hidden md:flex w-[50%] h-full bg-black items-center justify-center flex-col">
      <Image
        className="w-[400px] h-[400px]  rounded-full"
        src="/logo-with-bg.jpg"
        alt="logo"
        width="400"
        height="400"
      />

      <h1 className="text-6xl text-white">Zeus</h1>
    </div>
  );
};
