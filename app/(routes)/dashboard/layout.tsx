"use client";

import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SideNavbar from "./_components/SideNavbar";
import { FileListContext } from "./_context/FilesListContext";
import { ThemeProvider } from "next-themes";

const DashboardLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { user }: any = useKindeBrowserClient();
  const [fileList_, setFileList_] = useState();
  const convex = useConvex();
  const router = useRouter();

  useEffect(() => {
    user && checkTeam();
  }, [user]);

  const checkTeam = async () => {
    const result = await convex.query(api.teams.getTeam, {
      email: user?.email,
    });

    if (!result?.length) {
      router.push("teams/create");
    }
  };

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <FileListContext.Provider value={{ fileList_, setFileList_ }}>
        <div className="grid grid-cols-4">
          <div className="h-screen w-72 fixed">
            <SideNavbar />
          </div>

          <div className="grid-cols-3 ml-72">{children}</div>
        </div>
      </FileListContext.Provider>
    </ThemeProvider>
  );
};

export default DashboardLayout;
