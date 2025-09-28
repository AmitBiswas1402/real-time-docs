"use client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect } from "react";

const Home = () => {
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    console.log("--", user);
  }, [user]);
  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
};
export default Home;
