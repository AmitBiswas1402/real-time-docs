"use client";
import { SignInButton, useAuth, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

function Header() {
  const { isSignedIn } = useAuth();

  return (
    <header className="bg-black">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Image src="/logo-1.png" alt="logo" width={60} height={60} />

        <div className="flex flex-1 items-center justify-end md:justify-between">
          {/* Navigation */}
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              {["About", "Careers", "History", "Services", "Projects"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-white transition hover:text-gray-100/75"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </nav>

          {/* Auth + Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Auth buttons (Clerk) */}
            <div className="sm:flex sm:gap-4">
              {isSignedIn ? (
                <div className="flex items-center gap-2">
                  {/* User profile + SignOut */}
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <>
                  <SignInButton>
                    <button className="block rounded-md bg-blue-700 hover:bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignInButton mode="modal">
                    <button className="hidden sm:block rounded-md bg-green-700 hover:bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition">
                      Register
                    </button>
                  </SignInButton>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden cursor-pointer">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
      </div>
    </header>
  );
}

export default Header;
