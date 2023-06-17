import React from 'react';
import { BiDumbbell, BiUser, BiHome , BiMenu } from 'react-icons/bi';

export function Nav() {
  return (
    <nav className="w-11/12 md:w-1/2 mx-auto rounded-sm h-14 p-2">
      <ul className="flex justify-between h-full md:p-6">
        <li className="flex items-center">
          <BiDumbbell className="inline-flex items-center justify-center w-12 h-12 text-white" />
          <h1 className="text-white inline-flex p-1">NEXT GYM</h1>
        </li>
        <li className="hidden md:flex items-center">
          {/* icons in middle */}
        </li>
        <li className="flex items-center">
          <BiUser className="text-white h-8 w-8 rounded-full object-cover" />
        </li>
        
      </ul>
    </nav>
  );
}
