import React, { useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { AuthContext } from "@/auth/AuthProvider";
import { Menu, Transition } from "@headlessui/react";
import { auth } from "@/utils/firebase";
import { CgGym } from "react-icons/cg";
import {BiDumbbell} from "react-icons/bi";



export const Nav: React.FC = () => {
  const { currentUser } = useContext(AuthContext);

  return (
   <nav className="bg-black fixed bottom-0 w-full md:relative md:top-0 md:bottom-auto">
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-16 items-center justify-between">
        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <CgGym className="text-white" size={40} />
            </Link>
          </div>
          
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div className="relative ml-3">
            <Menu as="div" className="relative ml-3">
              <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                {currentUser?.photoURL ? (
                  <Image
                    src={currentUser.photoURL}
                    alt="User Icon"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                ) : (
                  <Image
                    src="/guest.png"
                    alt="User Icon"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                )}
              </Menu.Button>
              <Transition
                as={React.Fragment}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 md:top-full bottom-full w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-gray-100" : ""
                        } block px-2 py-4 text-sm text-gray-700`}
                        onClick={() => auth.signOut()}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

};

export default Nav;
