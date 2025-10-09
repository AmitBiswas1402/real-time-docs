import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import React from "react";

function Header() {
  return (
    <header className="bg-black border-b border-gray-800 shadow-sm">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-6 lg:px-10">
        {/* Logo + Brand Name */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo-1.png"
            alt="BuildDocs Logo"
            width={45}
            height={45}
            className="rounded"
          />
          <h1 className="text-2xl font-extrabold tracking-tight">
            <span className="text-sky-400">Flow</span>
            <span className="text-white">Note</span>
          </h1>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <LoginLink
            postLoginRedirectURL="/dashboard"
            className="text-white border border-gray-700 hover:border-sky-500 hover:text-sky-400 px-5 py-2.5 rounded-md text-sm font-medium transition duration-200"
          >
            Login
          </LoginLink>

          <RegisterLink
            className="hidden sm:inline-block bg-sky-500 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-sky-600 transition duration-200"
          >
            Register
          </RegisterLink>

          {/* Mobile Menu Button */}
          <button className="block rounded bg-gray-800 p-2.5 text-gray-400 transition hover:text-sky-400 md:hidden">
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
