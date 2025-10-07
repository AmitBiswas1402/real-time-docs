import { useContext, useEffect, useState } from "react";
import { FileListContext } from "../_context/FilesListContext";
import moment from "moment";
import Image from "next/image";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface FILE {
  archive: boolean;
  createdBt: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
  _id: string;
  _creationTime: number;
  lastEdited?: number;
}

const FileList = () => {
  const { user }: any = useKindeBrowserClient();
  const { fileList_, setFileList_ } = useContext(FileListContext);
  const [fileList, setfileList] = useState<any>();
  const router = useRouter();
  const convex = useConvex();

  const deleteFile = useMutation(api.files.deleteFile);

  useEffect(() => {
    fileList_ && setfileList(fileList_);
  }, [fileList_]);

  const onFileDelete = async (fileId: string) => {
    try {
      await deleteFile({ _id: fileId as any });
      toast.success("File deleted successfully!");

      // refresh the file list
      const updatedFiles = await convex.query(api.files.getFiles, {
        teamId: fileList_[0]?.teamId, // assumes files share same team
      });
      setFileList_(updatedFiles);
    } catch (error) {
      console.error(error);
      toast.error("Error deleting file!");
    }
  };

  return (
    <div className="mt-5">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                File Name
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Created At
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Edited
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Author
              </td>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">
            {fileList &&
              fileList.map((file: FILE, index: number) => (
                <tr
                  key={index}
                  className="odd:bg-gray-50 cursor-pointer"
                  onClick={() => router.push("/workspace/" + file._id)}
                >
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {file.fileName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {moment(file._creationTime).format("DD MMM YYYY")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {moment(file.lastEdited || file._creationTime).fromNow()}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {user && (
                      <Image
                        src={user?.picture}
                        alt="user"
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreHorizontal />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          className="gap-3 text-red-600"
                          onClick={(e) => {
                            e.stopPropagation(); // prevent navigation
                            onFileDelete(file._id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileList;
