import { ChevronDown, Settings, Users } from "lucide-react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const SideNavTopSec = () => {
  const menu=[
        {
            id:1,
            name:'Create Team',
            path:'/teams/create',
            icon:Users
        },
        {
            id:2,
            name:'Settings',
            path:'',
            icon:Settings
        }
    ];
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center gap-3 hover:bg-slate-200 p-2 rounded-md cursor-pointer">
          <Image src="/logo-1.png" alt="" width={40} height={40} />
          <h2 className="flex gap-2 items-center font-bold text-[17px]">
            Team Name
            <ChevronDown />
          </h2>
        </div>
      </PopoverTrigger>
      <PopoverContent className="ml-7 p-4">
        <div>
          <h2>Team Name</h2>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default SideNavTopSec;
