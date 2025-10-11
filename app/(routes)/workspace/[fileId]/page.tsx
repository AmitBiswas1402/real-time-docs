"use client";

import { useEffect, useState, use } from "react";
import Editor from "../_components/Editor";
import WorkSpaceHeader from "../_components/WorkSpaceHeader";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Canvas from "../_components/Canvas";

type WorkSpaceParams = {
  fileId: string;
};

interface FILE {
  archive: boolean;
  createdBt: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
  _id: string;
  _creationTime: number;
}

const WorkSpace = ({ params }: { params: Promise<WorkSpaceParams> }) => {
  const unwrappedParams = use(params);
  const [triggerSave, setTriggerSave] = useState(false);
  const convex = useConvex();
  const [fileData, setFileData] = useState<FILE | any>();
  const [activeView, setActiveView] = useState<"document" | "canvas" | "both">(
    "both"
  );

  // pane width state for draggable divider
  const [leftWidth, setLeftWidth] = useState(45); // percentage
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (unwrappedParams?.fileId) {
      getFileData(unwrappedParams.fileId as Id<"files">);
    }
  }, [unwrappedParams.fileId]);

  const getFileData = async (fileId: Id<"files">) => {
    const result = await convex.query(api.files.getFileById, { _id: fileId });
    setFileData(result);
  };

  // Handle mouse dragging
  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const newLeftWidth = (e.clientX / window.innerWidth) * 100;
    const clampedWidth = Math.min(Math.max(newLeftWidth, 33.33), 66.66);
    setLeftWidth(clampedWidth);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="min-h-screen flex flex-col">
      <WorkSpaceHeader
        fileId={fileData?._id || unwrappedParams.fileId}
        onSave={() => setTriggerSave(!triggerSave)}
      />

      {/* View Mode Switcher */}
      <div className="flex justify-center gap-2 py-2 border-b bg-white text-black dark:bg-neutral-900 dark:text-white transition-colors sticky top-0 z-10">
        <button
          onClick={() => setActiveView("document")}
          className={`px-3 py-1 rounded transition-colors cursor-pointer ${
            activeView === "document"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-black dark:bg-neutral-800 dark:text-white"
          }`}
        >
          Document
        </button>

        <button
          onClick={() => setActiveView("both")}
          className={`px-3 py-1 rounded transition-colors cursor-pointer ${
            activeView === "both"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-black dark:bg-neutral-800 dark:text-white"
          }`}
        >
          Both
        </button>

        <button
          onClick={() => setActiveView("canvas")}
          className={`px-3 py-1 rounded transition-colors cursor-pointer ${
            activeView === "canvas"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-black dark:bg-neutral-800 dark:text-white"
          }`}
        >
          Canvas
        </button>
      </div>

      {/* Main Content Area */}
      <div
        className={`flex flex-col md:flex-row w-full ${
          activeView === "both" ? "border-t border-gray-700" : ""
        }`}
      >
        {(activeView === "document" || activeView === "both") && (
          <div
            className={`${
              activeView === "both" ? "border-r border-gray-700" : ""
            }`}
            style={{
              width: activeView === "both" ? `${leftWidth}%` : "100%",
            }}
          >
            <Editor
              onSaveTrigger={triggerSave}
              fileId={unwrappedParams.fileId}
              fileData={fileData}
            />
          </div>
        )}

        {activeView === "both" && (
          <div
            onMouseDown={handleMouseDown}
            className={`w-1 cursor-col-resize transition-colors ${
              isDragging
                ? "bg-blue-500"
                : "bg-gray-200 dark:bg-gray-500 hover:bg-blue-500"
            }`}
          />
        )}

        {(activeView === "canvas" || activeView === "both") && (
          <div
            style={{
              width: activeView === "both" ? `${100 - leftWidth}%` : "100%",
            }}
          >
            <Canvas
              onSaveTrigger={triggerSave}
              fileId={unwrappedParams.fileId}
              fileData={fileData}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkSpace;
