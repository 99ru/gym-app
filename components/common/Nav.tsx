import React, { useContext } from "react";
import Image from "next/image";
import { AuthContext } from "@/auth/AuthProvider";
import { Menu, Transition } from "@headlessui/react";
import { auth } from "@/utils/firebase";
import Calendar from "@/components/ui/Calendar";
import { CgGym as GymIcon } from "react-icons/cg";

import AddWorkout from "@/components/ui/AddWorkout";

const Nav: React.FC<{
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  setIsAddingWorkout: (show: boolean) => void;
}> = ({ selectedDate, setSelectedDate, setIsAddingWorkout }) => {
  const { currentUser } = useContext(AuthContext);

 return (
  <section className="fixed bottom-0 w-full h-12 md:top-0 md:left-0 md:w-full md:h-12 bg-black shadow-md">
    <nav className="flex justify-between items-center px-8 w-full h-full md:flex-row md:justify-evenly">
      <div>
        <span className="font-bold text-xl text-white">
          <GymIcon size={40} /> 
        </span>
      </div>
      <div className="flex space-x-4 md:space-x-4 md:space-y-0 md:my-0">
      
        <AddWorkout setIsAddingWorkout={setIsAddingWorkout} />
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
      <Menu as="div" className="relative">
        <Menu.Button className="rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 mt-2">
          {currentUser?.photoURL ? (
            <Image
              src={currentUser.photoURL}
              alt="User Icon"
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <Image
              src="/fallback.png"
              alt="User Icon"
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
        </Menu.Button>
        <Transition as={React.Fragment}>
          <Menu.Items className="absolute right-0 w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 md:top-full md:origin-top-right bottom-full origin-bottom-right md:bottom-auto">

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
    </nav>
  </section>
);


};

export default Nav;
