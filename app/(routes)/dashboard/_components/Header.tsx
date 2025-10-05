import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Search, Send } from "lucide-react";
import Image from "next/image";
import React from "react";

function Header() {
  const { user }: any = useKindeBrowserClient();

  const profileSrc =
    user?.picture && user.picture.trim() !== ""
      ? user.picture
      : "/default-avatar.png";

  return (
    <div className="flex justify-end w-full gap-4 items-center">
      <div className="flex gap-2 items-center border rounded-md p-2 w-64 bg-white">
        <Search className="h-4 w-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search"
          className="w-full outline-none text-sm"
        />
      </div>

      <div>
        <Image
          src={profileSrc}
          alt="user"
          width={32}
          height={32}
          className="rounded-full cursor-pointer"
        />
      </div>

      <Button className="gap-2 flex text-sm h-8 hover:bg-blue-700 bg-blue-600 cursor-pointer">
        <Send className="h-4 w-4" /> Invite
      </Button>
    </div>
  );
}

export default Header;
