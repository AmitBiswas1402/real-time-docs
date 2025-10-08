import { useContext, useEffect, useState } from "react";
import { FileListContext } from "../_context/FilesListContext";
import moment from "moment";
import Image from "next/image";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Trash2 } from "lucide-react";
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
  const [fileList, setfileList] = useState<FILE[]>([]);
  const router = useRouter();
  const convex = useConvex();
  const deleteFile = useMutation(api.files.deleteFile);

  useEffect(() => {
    if (fileList_) setfileList(fileList_);
  }, [fileList_]);

  const onFileDelete = async (fileId: string) => {
    try {
      await deleteFile({ _id: fileId as any });
      toast.success("File deleted successfully!");

      // refresh file list
      const updatedFiles = await convex.query(api.files.getFiles, {
        teamId: fileList_[0]?.teamId,
      });
      setFileList_(updatedFiles);
    } catch (error) {
      console.error(error);
      toast.error("Error deleting file!");
    }
  };

  return (
    <div className="mt-5">
      <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y-2 divide-gray-200 dark:divide-gray-700">
          {/* Table Head */}
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

          {/* Table Body */}
          <tbody className="divide-y divide-gray-200 *:even:bg-gray-50 dark:divide-gray-700 dark:*:even:bg-gray-800">
            {fileList?.length ? (
              fileList.map((file: FILE) => (
                <tr
                  key={file._id}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => router.push("/workspace/" + file._id)}
                >
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                    {file.fileName}
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
                    <button
                      onClick={() => onFileDelete(file._id)}
                      className="p-2 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                    >
                      <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </button>
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
