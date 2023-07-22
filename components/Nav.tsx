import React, { useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
/* import CurrentTime from "./CurrentTime"; */
import { AuthContext } from "@/auth/AuthProvider";
export function Nav() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <nav className="bg-dark">
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
                  <Image
                    src="/barbell.svg"
                    alt="User Icon"
                    width={40}
                    height={40}
                  />
                  <h1 className="text-white">GETFIT</h1>
                </div>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block"></div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">
              <div className="flex-1 flex flex-items-center">
                {currentUser?.photoURL ? (
                  <Image
                    src={currentUser.photoURL}
                    alt="User Icon"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <Image
                    src="/guest.png"
                    alt="User Icon"
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                )}
                <button className="ml-2 text-white" onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Mobile nav content */}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Nav;
