import React from 'react';
import { BiDumbbell, BiUser } from 'react-icons/bi';

export function Nav() {
  return (
    <nav className="transition min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
    
      <div className="w-full h-[5rem] px-[3rem] till-phone:px-[5vw] relative till-desktop:h-[6rem] justify-between flex items-center">
        <div className="flex items-center space-x-2">
          <BiDumbbell className="w-8 h-8 text-black" />
          <h1 className="text-black">NEXT GYM</h1>
        </div>
        <div className="flex items-center">
          <BiUser className="text-black h-8 w-8 rounded-full" />
        </div>
      </div>
    </nav>
  );
}
