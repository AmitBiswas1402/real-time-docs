"use client";

import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

function Header() {
  const { user }: any = useKindeBrowserClient();
  const { theme, setTheme } = useTheme();

  const profileSrc =
    user?.picture && user.picture.trim() !== ""
      ? user.picture
      : "/default-avatar.png";

  return (
    <div className="flex justify-end w-full gap-4 items-center">
      {/* Theme toggle button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="relative cursor-pointer"
      >
        {/* Sun icon (visible in light mode) */}
        <SunIcon className="h-[1.2rem] w-[1.2rem] transition-all rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
        {/* Moon icon (visible in dark mode) */}
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] transition-all rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      {/* User profile image */}
      <div>
        <Image
          src={profileSrc}
          alt="user"
          width={32}
          height={32}
          className="rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
}

export default Header;
