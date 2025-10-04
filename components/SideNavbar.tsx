import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNavTopSec, { TEAM } from "./SideNavTopSec";
import SideNavBottomSec from "./SideNavBottomSec";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SideNavbar = () => {
  const {user} = useKindeBrowserClient();
  const createFile=useMutation(api.files.createFile);
  const [activeTeam, setActiveTeam]=useState<TEAM|any>();
  const [totalFiles, setTotalFiles] = useState<Number>();
  const convex = useConvex();

  useEffect(() => {
    activeTeam && getFiles();
  }, [activeTeam])

  const onFileCreate = (fileName:string) => {
    console.log(fileName)
    createFile({
      fileName: fileName,
      teamId: activeTeam?._id,
      createdBy: user?.email ?? "",
      archive: false,
      document: '',
      whiteboard: ''
    }).then(resp => {
      if (resp) {
        getFiles();
        toast('File created Successfully!')
      }
    }, (e) => {
      toast('Error creating file!')
    })
  }

  const getFiles = async() => {
    const result = await convex.query(api.files.getFiles, {
      teamId: activeTeam?._id
    })
    console.log(result);
    setTotalFiles(result?.length);
  }
  
  return (
    <div className="h-screen fixed w-72 border-r border-[1px] p-6 flex flex-col">
      <div className="flex-1">
        <SideNavTopSec user={user} 
        setActiveTeamInfo={(activeTeam:TEAM)=>setActiveTeam(activeTeam)} />
      </div>

      <div>
        <SideNavBottomSec totalFiles={totalFiles} onFileCreate={onFileCreate} />
      </div>
    </div>
  );
};

export default SideNavbar;
