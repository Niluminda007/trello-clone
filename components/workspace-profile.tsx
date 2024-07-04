import { generateInitials } from "@/lib/utils";

interface WorkspaceProfileProps {
  name: string;
}

const WorkspaceProfile = ({ name }: WorkspaceProfileProps) => {
  return (
    <div className="flex items-center gap-x-2">
      <div className="w-7 h-7 relative flex flex-col items-center cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-lg shadow-xl transform transition-transform hover:scale-105">
        <div className="w-full h-full flex items-center justify-center bg-white text-white text-lg rounded-full uppercase mb-4">
          {generateInitials(name)}
        </div>
      </div>
      <span className="font-medium text-sm">{name}</span>
    </div>
  );
};

export default WorkspaceProfile;
