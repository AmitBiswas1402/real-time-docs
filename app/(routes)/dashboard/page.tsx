import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useQuery } from "convex/react";
import { useEffect } from "react";

function Dashboard() {
  const { user } = useKindeBrowserClient();
  const getUser = useQuery(
    api.user.getUser,
    user?.email ? { email: user.email } : "skip"
  );

  // const createUser=useMutation(api.user.createUser);
  useEffect(()=>{
      
  },[user])

  return (
    <div>
      Dashboard
    </div>
  )
}

export default Dashboard;