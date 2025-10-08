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

  useEffect(() => {
    if (unwrappedParams?.fileId) {
      console.log("File ID:", unwrappedParams.fileId);
      getFileData(unwrappedParams.fileId as Id<"files">);
    }
  }, [unwrappedParams.fileId]);

  const getFileData = async (fileId: Id<"files">) => {
    const result = await convex.query(api.files.getFileById, { _id: fileId });
    console.log(result);
    setFileData(result);
  };

  return (
    <div>
      <WorkSpaceHeader
        fileId={fileData?._id || unwrappedParams.fileId}
        onSave={() => setTriggerSave(!triggerSave)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="h-screen">
          <Editor
            onSaveTrigger={triggerSave}
            fileId={unwrappedParams.fileId}
            fileData={fileData}
          />
        </div>
        <div className="h-screen border-l">
          <Canvas
            onSaveTrigger={triggerSave}
            fileId={unwrappedParams.fileId}
            fileData={fileData}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkSpace;
