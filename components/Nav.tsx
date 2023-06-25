"use client";
import React, { useState } from "react";
import CurrentTime from "./CurrentTime";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { CgUser } from "react-icons/cg";
import { CiDumbbell } from "react-icons/ci";
import Link from "next/link";

export function Nav() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSignedIn, setSignedIn] = useState(false); // Set this state based on your authentication status
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // Set this state based on mobile menu toggle

  return (
    <nav className="bg-black">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
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
                <button
                  type="button"
                  className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                >
                  <CgUser className="h-8 w-8 text-white" />
                </button>
              </div>
              {isDropdownOpen && (
                <div className="origin-top-right absolute z-50 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <Link href="/profile">
                      <div
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Your Profile
                      </div>
                    </Link>
                    {isSignedIn ? (
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        role="menuitem"
                        onClick={() => {
                          setSignedIn(false);
                          // Add your sign out logic here
                        }}
                      >
                        Sign out
                      </button>
                    ) : (
                      <Link href="/sign-in">
                        <div
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Sign in
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              )}
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
        <CurrentTime />
      </div>
    </nav>
  );
}

export default Nav;
