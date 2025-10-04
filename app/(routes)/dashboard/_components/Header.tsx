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
    <div className="flex justify-start w-screen gap-2 items-center">
      <div className="flex gap-2 items-center border rounded-md p-1">
        <Search className="h-4 w-4" />
        <input type="text" placeholder="Search" />
      </div>

      <div>
        <Image
          src={profileSrc}
          alt="user"
          width={30}
          height={30}
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
