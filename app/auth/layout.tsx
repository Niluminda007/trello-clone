import { AuthBackground } from "./_components/auth-background";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full flex">
      <AuthBackground />
      <div className="w-full md:w-[50%] h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
