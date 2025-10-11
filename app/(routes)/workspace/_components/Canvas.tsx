"use client";

import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";
import { MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useTheme } from "next-themes";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  { ssr: false }
);

interface FILE {
  archive: boolean;
  createdBy: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
  _id: string;
  _creationTime: number;
}

export default function Canvas({
  onSaveTrigger,
  fileId,
  fileData,
}: {
  onSaveTrigger: any;
  fileId: any;
  fileData: FILE;
}) {
  const [whiteBoardData, setWhiteBoardData] = useState<any>();
  const updateWhiteboard = useMutation(api.files.updateWhiteboard);
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    if (onSaveTrigger) saveWhiteBoard();
  }, [onSaveTrigger]);

  const saveWhiteBoard = async () => {
    try {
      await updateWhiteboard({
        _id: fileId,
        whiteboard: JSON.stringify(whiteBoardData),
      });
      console.log("Whiteboard Updated ✅");
    } catch (err) {
      console.error("Error saving whiteboard:", err);
    }
  };

  return (
    <div
      className="min-h-screen bg-white dark:bg-[#1e1e1e] overflow-visible pb-20"
    >
      {fileData && (
        <div className="w-full h-[150vh] sm:h-[200vh] md:h-[250vh] relative">
          {/* The height values make it vertically long enough to scroll */}
          <Excalidraw
            theme={currentTheme === "dark" ? "dark" : "light"}
            initialData={{
              elements:
                fileData?.whiteboard && JSON.parse(fileData?.whiteboard),
            }}
            onChange={(elements) => setWhiteBoardData(elements)}
            UIOptions={{
              canvasActions: {
                toggleTheme: false,
              },
            }}
          >
            <MainMenu>
              <MainMenu.DefaultItems.ClearCanvas />
              <MainMenu.DefaultItems.Export />
              <MainMenu.DefaultItems.CommandPalette />
              <MainMenu.DefaultItems.ChangeCanvasBackground />
            </MainMenu>

            <WelcomeScreen>
              <WelcomeScreen.Hints.MenuHint />
              <WelcomeScreen.Hints.ToolbarHint />
              <WelcomeScreen.Center>
                <WelcomeScreen.Center.MenuItemHelp />
              </WelcomeScreen.Center>
            </WelcomeScreen>
          </Excalidraw>
        </div>
      )}
    </div>
  );
}
