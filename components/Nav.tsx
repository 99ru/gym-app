import React from 'react';
import { BiDumbbell, BiUser } from 'react-icons/bi';

export function Nav() {
  return (
    <nav className="fixed top-0 left-1/4 right-1/4 h-14 p-2">
      <ul className="flex justify-between h-full">
        <li className="flex items-center">
          <BiDumbbell className="inline-flex items-center justify-center w-12 h-12 text-white" />
          <h1 className="text-white inline-flex p-1">NEXT GYM</h1>
        </li>
        <li className="flex items-center">
          {/* icons in middle */}
        </li>
        <li className="flex items-center">
          <BiUser className="text-white h-8 w-8 rounded-full object-cover" />
        </li>
      </ul>
    </nav>
  );
}
