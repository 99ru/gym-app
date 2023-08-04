import React, { useContext } from "react";
import Image from "next/image";
import { AuthContext } from "@/auth/AuthProvider";
import { Menu, Transition } from "@headlessui/react";
import { auth } from "@/utils/firebase";
import Calendar from "@/components/ui/Calendar";
import {CgGym as GymIcon} from 'react-icons/cg';
import AddWorkout from '@/components/ui/AddWorkout';

const Nav: React.FC<{ selectedDate: Date; setSelectedDate: React.Dispatch<React.SetStateAction<Date>>, setIsAddingWorkout: (show: boolean) => void; }> = ({ selectedDate, setSelectedDate, setIsAddingWorkout }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="flex justify-center items-center">
      <nav className="flex justify-center items-center fixed top-4 z-50">
        <div className="w-80 h-12  bg-black shadow-md rounded-full flex justify-between items-center px-5">
          <div>
            <span className="font-bold text-xl text-white">
              <GymIcon size={40} />
            </span>
          </div>
          <div>
            <AddWorkout setIsAddingWorkout={setIsAddingWorkout} />
          </div>
          <div>
            <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          </div>
          <Menu as="div" className="relative">
            <Menu.Button className="rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 mt-2">
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
              <Menu.Items className="origin-top-right absolute right-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 mt-2">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-100" : ""
                      } block w-full text-left px-4 py-2 text-sm text-gray-700`}
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
      </nav>
    </div>
  );
};

export default Nav;
