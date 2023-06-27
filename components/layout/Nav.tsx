"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { SignedIn, SignedOut } from "@clerk/nextjs/app-beta/client";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { CiDumbbell } from "react-icons/ci";

export function Nav() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-black">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <AiOutlineClose className="h-6 w-6" />
              ) : (
                <AiOutlineMenu className="h-6 w-6" />
              )}
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <div className="flex items-center space-x-2">
                  <CiDumbbell className="h-8 w-8 text-white" />
                  <h1 className="text-white">GYM APP</h1>
                </div>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {/* Add your main nav links here */}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">
              <div>
                <SignedIn>
                  <>
                  <Link href="/">
                    <UserButton />
                   </Link>
                  </>
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="rounded border border-white px-3 py-0.5 text-white">
                      Sign in
                    </button>
                  </SignInButton>
                </SignedOut>
              </div>
              <div className="origin-top-right absolute z-50 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                {/* Add your dropdown menu logic here */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Add your mobile menu here */}
          </div>
        </div>
      )}
      <div className="w-full px-[3rem] till-phone:px-[5vw] h-[2rem] till-desktop:h-[4rem] flex items-center justify-center bg-white bg-white text-black">
        {/* Add your current time component here */}
      </div>
    </nav>
  );
}

export default Nav;
