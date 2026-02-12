type SidebarItemProps = {
    title: string;
    icon: string;
  };
  
  export function SidebarItem({ title, icon }: SidebarItemProps) {
    return (
      <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded px-2 py-1">
        <img src={icon} alt="" className="h-6" />
        <div className="truncate text-sm text-gray-700">
          {title}
        </div>
      </div>
    );
  }
  