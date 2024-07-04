import dynamic from "next/dynamic";

const Scene = dynamic(
  () => import("@/components/modals/3d-modals/robot/Scene"),
  { ssr: false }
);

interface InviteLayoutProps {
  children: React.ReactNode;
}
const InviteLayout = ({ children }: InviteLayoutProps) => {
  return (
    <main className="relative h-full bg-black flex items-center justify-center">
      <Scene />
      {children}
      <footer className="absolute bottom-0 left-0 w-full text-center text-white text-xs p-2">
        Model &quot;Robot Playground&quot; by
        <a
          href="https://sketchfab.com/hadrien59"
          target="_blank"
          rel="noopener noreferrer">
          Hadrien59
        </a>
        on
        <a
          href="https://sketchfab.com"
          target="_blank"
          rel="noopener noreferrer">
          Sketchfab
        </a>
        , licensed under
        <a
          href="http://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          rel="noopener noreferrer">
          CC Attribution
        </a>
      </footer>
    </main>
  );
};

export default InviteLayout;
