"use client";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation } from "convex/react";
import { useEffect } from "react";
import Header from "./_components/Header";
import FileList from "./_components/FileList";

function Dashboard() {
  const convex = useConvex();
  const { user } = useKindeBrowserClient();
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, [user]);

  const checkUser = async () => {
    const result = await convex.query(api.user.getUser, {
      email: user?.email ?? "",
    });

    if (!result?.length && user) {
      createUser({
        name: user.given_name ?? "",
        email: user.email ?? "",
        image: user.picture ?? "",
      }).then((resp) => {
        console.log(resp);
      });
    }
  };

  return (
    <div className="fixed top-0 left-[16rem] right-0 bottom-0 p-8 overflow-hidden">
      {/* Header section */}
      <Header />

      {/* File list section */}
      <div className="mt-6 h-[calc(100%-80px)] overflow-auto">
        <FileList />
      </div>
    </div>
  );
}

export default Dashboard;
