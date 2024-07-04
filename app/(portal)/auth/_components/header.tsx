import Image from "next/image";
interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="flex flex-col gap-y-4 items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <Image src="/logo.png" alt="logo" height="70" width="70" />
        <h1 className={"text-2xl font-semibold"}>Quanta Auth</h1>
      </div>

      <p className="text-muted-foreground">{label}</p>
    </div>
  );
};
