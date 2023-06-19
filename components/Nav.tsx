import React from "react";
import { BiUser,} from "react-icons/bi";
import {IoBarbellOutline} from "react-icons/io5";
import CurrentTime from "./CurrentTime";

export function Nav() {
  return (
    <>
      <nav className="transition min-w-0 rounded-lg shadow-2xl overflow-hidden bg-white dark:bg-gray-800">
        <div className="w-full h-[4rem] px-[3rem] till-phone:px-[5vw] relative till-desktop:h-[6rem] justify-between flex items-center">
          <li className="flex items-center space-x-2">
            <IoBarbellOutline className="w-8 h-8 text-black" />
            <strong>
            <h1 className="text-black">GYM APP</h1>
            </strong>
          </li>
          {/* New section for the icons */}
        
          {/* End of new section */}
          <li className="flex items-center">
            <BiUser className="text-black h-8 w-8 rounded-full" />
          </li>
        </div>
      </nav>
      <div className="w-full px-[3rem] till-phone:px-[5vw] h-[2rem] till-desktop:h-[4rem] flex items-center justify-center bg-black bg-black text-white">
        <CurrentTime />
      </div>
    </>
  );
}
