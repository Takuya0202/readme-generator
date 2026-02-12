import { File } from "lucide-react";
import type { Project } from "../../types/projects";

export function SidebarItem({ project }: { project: Project }) {
  return (
    <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded px-2 py-1">
      <File
        className="w-[22px] h-[22px]"
      />
      <div className="truncate text-sm text-gray-700">
        {project.name}
      </div>
    </div>
  );
}
