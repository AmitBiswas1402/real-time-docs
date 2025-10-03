import { ChevronDown, LogOut, Settings, Users } from "lucide-react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Separator } from "./ui/separator";

const SideNavTopSec = () => {
  const menu = [
    {
      id: 1,
      name: "Create Team",
      path: "/teams/create",
      icon: Users,
    },
    {
      id: 2,
      name: "Settings",
      path: "",
      icon: Settings,
    },
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
        <Separator className="mt-2 bg-slate-100" />
        <div>
          {menu.map((item, index) => (
            <h2
              key={index}
              className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </h2>
          ))}
          <LogoutLink>
            <h2 className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <LogOut className="h-4 w-4" />
              Logout
            </h2>
          </LogoutLink>
        </div>
        <Separator className="mt-2 bg-slate-100" />
      </PopoverContent>
    </Popover>
  );
};
export default SideNavTopSec;
