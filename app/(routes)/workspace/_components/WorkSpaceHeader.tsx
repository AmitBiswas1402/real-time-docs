"use client";

import { Button } from "@/components/ui/button";
import { Link, MoonIcon, Save, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

interface WorkSpaceHeaderProps {
  onSave: () => void;
  fileId: string; 
}

const WorkSpaceHeader = ({ onSave, fileId }: WorkSpaceHeaderProps) => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  // Fetch the file from Convex
  const fileData = useQuery(api.files.getFileById, { _id: fileId as any });

  return (
    <div className="p-3 border-b flex justify-between items-center bg-background text-foreground">
      {/* Left Section: Logo + File Name */}
      <div
        className="flex gap-2 items-center cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        <Image src={"/logo-1.png"} alt="logo" height={40} width={40} />
        <h2 className="text-lg font-semibold">
          {fileData ? fileData.fileName : "Loading..."}
        </h2>
      </div>

      {/* Right Section: Actions */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="relative cursor-pointer"
        >
          <SunIcon className="h-[1.2rem] w-[1.2rem] transition-all rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] transition-all rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Save Button */}
        <Button
          className="h-8 text-[12px] gap-2 bg-yellow-500 hover:bg-yellow-600 cursor-pointer"
          onClick={onSave}
        >
          <Save className="h-4 w-4" /> Save
        </Button>

        {/* Share Button */}
        <Button className="h-8 text-[12px] gap-2 bg-blue-600 hover:bg-blue-700 cursor-pointer">
          Share <Link className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default WorkSpaceHeader;
