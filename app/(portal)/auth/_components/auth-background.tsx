export const AuthBackground = () => {
  return (
    <div
      className="absolute z-0 top-0 left-0 w-full md:static  md:flex md:w-[50%] h-full bg-black items-center justify-center flex-col "
      style={{
        background: `no-repeat center url(/auth-background.jpg) `,
        backgroundSize: "cover",
      }}
    >
      <div className="w-full h-full bg-[rgba(0,0,0,.4)]"></div>
    </div>
  );
};
