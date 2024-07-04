import { generateInitials } from "@/lib/utils";

interface WorkspaceImageProps {
  name: string;
}

export const WorkspaceImage = ({ name }: WorkspaceImageProps) => {
  return (
    <div className="w-7 h-7 relative flex flex-col items-center cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-lg shadow-xl transform transition-transform hover:scale-105">
      <div className="w-full h-full flex items-center justify-center bg-white text-white text-lg rounded-full uppercase mb-4">
        {generateInitials(name)}
      </div>
    </div>
  );
};
