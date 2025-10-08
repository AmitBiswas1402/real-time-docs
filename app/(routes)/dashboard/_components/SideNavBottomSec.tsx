import { Archive, Flag, Github } from "lucide-react";

import { useState } from "react";
import constants from "@/constants/Constants";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SideNavBottomSec = ({ onFileCreate, totalFiles }: any) => {
  const [fileInput, setFileInput] = useState("");

  return (
    <div>
      {/* Add new file button */}
      <Dialog>
        <DialogTrigger className="w-full" asChild>
          <Button className="w-full text-center bg-blue-600 hover:bg-blue-700 justify-start mt-3 cursor-pointer">
            New File
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
            <DialogDescription>
              <Input
                placeholder="Enter File Name"
                className="mt-3"
                onChange={(e) => setFileInput(e.target.value)}
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
                disabled={!(fileInput && fileInput.length > 3)}
                onClick={() => onFileCreate(fileInput)}
              >
                Create
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Progress Bar  */}
      <div className="h-4 w-full bg-gray-200 rounded-full mt-5">
        <div
          className={`h-4  bg-blue-600 rounded-full`}
          style={{ width: `${(totalFiles / 10) * 100}%` }}
        ></div>
      </div>

      <h2 className="text-[12px] mt-3">
        <strong>{totalFiles}</strong> out of{" "}
        <strong>{constants.MAX_FREE_FILE}</strong> files used
      </h2>
    </div>
  );
};

export default SideNavBottomSec;
