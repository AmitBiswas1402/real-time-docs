"use client"
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useMutation, useQuery } from "convex/react";
import { useEffect } from "react";

function Dashboard() {
  const { user } = useKindeBrowserClient();
  const getUser = useQuery(
    api.user.getUser,
    user?.email ? { email: user.email } : "skip"
  );

  const createUser=useMutation(api.user.createUser);
  useEffect(()=>{
      if (user) {
        if (getUser == undefined) {
          createUser({
            name: user.given_name ?? "",
            email: user.email ?? "",
            image: user.picture ?? ""
          }).then((resp) => {
            console.log(resp);            
          })
        }
      }
  },[user])

  return (
    <div>
      Dashboard
    </div>
  )
}

export default Dashboard;