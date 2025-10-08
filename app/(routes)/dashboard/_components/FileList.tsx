import { useContext, useEffect, useState } from "react";
import { FileListContext } from "../_context/FilesListContext";
import moment from "moment";
import Image from "next/image";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Id } from "@/convex/_generated/dataModel";

interface FILE {
  archive: boolean;
  createdBt: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
  _id: Id<"files">;
  _creationTime: number;
  lastEdited?: number;
}

const FileList = () => {
  const { user }: any = useKindeBrowserClient();
  const { fileList_, setFileList_ } = useContext(FileListContext);
  const [fileList, setfileList] = useState<FILE[]>([]);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const router = useRouter();
  const convex = useConvex();

  const deleteFile = useMutation(api.files.deleteFile);
  const renameFile = useMutation(api.files.renameFile);

  useEffect(() => {
    if (fileList_) setfileList(fileList_);
  }, [fileList_]);

  const onFileDelete = async (fileId: string) => {
    try {
      await deleteFile({ _id: fileId as any });
      toast.success("File deleted successfully!");

      const updatedFiles = await convex.query(api.files.getFiles, {
        teamId: fileList_[0]?.teamId,
      });
      setFileList_(updatedFiles);
    } catch (error) {
      console.error(error);
      toast.error("Error deleting file!");
    }
  };

  const handleRenameStart = (file: FILE) => {
    setRenamingId(file._id);
    setRenameValue(file.fileName);
  };

  const handleRenameSave = async (file: FILE) => {
    if (!renameValue.trim() || renameValue === file.fileName) {
      setRenamingId(null);
      return;
    }

    try {
      await renameFile({ _id: file._id, newName: renameValue });
      toast.success("File renamed");

      const updatedFiles = await convex.query(api.files.getFiles, {
        teamId: fileList_[0]?.teamId,
      });
      setFileList_(updatedFiles);
    } catch (e) {
      console.error(e);
      toast.error("Rename failed");
    } finally {
      setRenamingId(null);
    }
  };

  return (
    <div className="mt-5">
      <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y-2 divide-gray-200 dark:divide-gray-700">
          <thead className="ltr:text-left rtl:text-right">
            <tr className="*:font-medium *:text-gray-900 dark:*:text-white">
              <th className="px-4 py-3 whitespace-nowrap">File Name</th>
              <th className="px-4 py-3 whitespace-nowrap">Created At</th>
              <th className="px-4 py-3 whitespace-nowrap">Edited</th>
              <th className="px-4 py-3 whitespace-nowrap">Author</th>
              <th className="px-4 py-3 whitespace-nowrap text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 *:even:bg-gray-50 dark:divide-gray-700 dark:*:even:bg-gray-800 cursor-pointer">
            {fileList?.length ? (
              fileList.map((file: FILE) => (
                <tr
                  key={file._id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() =>
                    renamingId ? null : router.push("/workspace/" + file._id)
                  }
                >
                  <td
                    className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100"
                    onDoubleClick={() => handleRenameStart(file)} // 👈 like Eraser
                  >
                    {renamingId === file._id ? (
                      <input
                        className="w-full rounded bg-transparent border border-blue-500 px-1 outline-none"
                        value={renameValue}
                        autoFocus
                        onChange={(e) => setRenameValue(e.target.value)}
                        onBlur={() => handleRenameSave(file)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleRenameSave(file);
                          if (e.key === "Escape") setRenamingId(null);
                        }}
                      />
                    ) : (
                      file.fileName
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {moment(file._creationTime).format("DD MMM YYYY")}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {moment(file.lastEdited || file._creationTime).fromNow()}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {user && (
                      <Image
                        src={user.picture ?? "/default-avatar.png"}
                        alt="user"
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                    )}
                  </td>
                  <td
                    className="px-4 py-3 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreHorizontal />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="text-left">
                        <DropdownMenuItem
                          className="gap-2 cursor-pointer flex items-center justify-start"
                          onClick={() => handleRenameStart(file)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span>Rename</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="gap-2 cursor-pointer flex items-center justify-start text-red-600 dark:text-red-400 font-medium"
                          onClick={() => onFileDelete(file._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
                >
                  No files found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileList;
