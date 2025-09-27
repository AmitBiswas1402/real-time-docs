"use client"
import { api } from "@/convex/_generated/api"
import { useUser } from "@clerk/nextjs"
import { useMutation, useQuery } from "convex/react"
import { useEffect } from "react"

const Dashboard = () => {
  const { user }:any = useUser();
  const getUser = useQuery(api.user.getUser, { email: user?.primaryEmailAddress?.emailAddress });

  const createUser = useMutation(api.user.createUser)
  useEffect(() => {
    if (user) {
      if (getUser === undefined) {
        createUser({
          name: user.given_name,
          email: user.email,
          image: user.picture
        }).then((resp) => {
          console.log(resp);
        })
      }
    }
  }, [user])

  return (
    <div>Dashboard</div>
  )
}
export default Dashboard