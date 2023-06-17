
import { BiUser, BiHome, BiDumbbell } from "react-icons/bi";

export function Nav() {
  return (
    <nav className="w-1/2 mx-auto rounded-sm h-20 p-2">
      <ul className="flex justify-between h-full p-6">
        <li className="flex items-center">
          <BiDumbbell className=" inline-flex items-center justify-center w-12 h-12 text-white"/>
          <h1 className="text-white inline-flex">Next Gym</h1>
        </li>
        <li className="flex items-center">
          <BiHome className="text-white h-8 w-8 rounded-full object-cover" />
          <BiHome className="text-white h-8 w-8 rounded-full object-cover" />
          <BiHome className="text-white h-8 w-8 rounded-full object-cover" />
          {/* Add more icons here */}
        </li>
        <li className="flex items-center">
          <BiUser className="text-white h-8 w-8 rounded-full object-cover" />
        </li>
      </ul>
    </nav>
  );
}