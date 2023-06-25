import React from "react";
import { BiUser } from "react-icons/bi";
import { IoBarbellOutline } from "react-icons/io5";
import CurrentTime from "./CurrentTime";
import Link from "next/link";

export function Nav() {
  return (
    <>
      <nav className="min-w-0 rounded-lg shadow-2xl bg-white">
        <ul className="w-full h-[4rem] px-[3rem] till-phone:px-[5vw] relative till-desktop:h-[6rem] justify-around flex items-center">
          <li className="flex items-center space-x-2">
            <Link href="/">
              <IoBarbellOutline className="w-8 h-8 text-black" />
              <strong>
                <h1 className="text-black">GYM APP</h1>
              </strong>
            </Link>
          </li>

          <li className="flex items-center">
            <Link href="/profile">
              <BiUser className="text-black h-8 w-8 rounded-full" />
            </Link>
          </li>
        </ul>
      </nav>
      <div className="w-full px-[3rem] till-phone:px-[5vw] h-[2rem] till-desktop:h-[4rem] flex items-center justify-center bg-black bg-black text-white">
        <CurrentTime />
      </div>
    </>
  );
}
