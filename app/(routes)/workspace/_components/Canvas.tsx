"use client";

import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";
import { MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

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
  const [canvasHeight, setCanvasHeight] = useState("100vh"); 

  const updateWhiteboard = useMutation(api.files.updateWhiteboard);

  useEffect(() => {
    if (onSaveTrigger) saveWhiteBoard();
  }, [onSaveTrigger]);

  useEffect(() => {
    const updateHeight = () => {
      const headerHeight = document.querySelector("header")?.offsetHeight || 60; 
      setCanvasHeight(`${window.innerHeight - headerHeight}px`);
    };

    updateHeight(); 
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

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
    <div style={{ height: canvasHeight, transition: "height 0.2s ease" }}>
      {fileData && (
        <Excalidraw
          initialData={{
            elements:
              fileData?.whiteboard && JSON.parse(fileData?.whiteboard)
          }}
          onChange={(elements) => setWhiteBoardData(elements)}
        >
          <MainMenu>
            <MainMenu.DefaultItems.ClearCanvas />
            <MainMenu.DefaultItems.Export />
            <MainMenu.DefaultItems.CommandPalette />
            <MainMenu.DefaultItems.ToggleTheme />
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
      )}
    </div>
  );
}
