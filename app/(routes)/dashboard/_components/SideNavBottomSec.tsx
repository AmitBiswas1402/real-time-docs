import { useState } from "react";
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

const SideNavBottomSec = ({ onFileCreate }: any) => {
  const [fileInput, setFileInput] = useState("");

  return (
    <div>
      {/* Add new file button */}
      <Dialog>
        <DialogTrigger className="w-full" asChild>
          <Button className="w-full text-center bg-blue-600 hover:bg-blue-700 justify-center mt-3 cursor-pointer">
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
    </div>
  );
};

export default SideNavBottomSec;
