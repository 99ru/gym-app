import React from "react";
import { CgGym as GymIcon } from "react-icons/cg";

const Header: React.FC = () => {
  return (
    <header className="bg-black text-white p-4">
      <div className="container mx-auto flex">
        <h1 className="text-xl font-bold">FIT</h1>
        <GymIcon size={40} />
      </div>
    </header>
  );
};

export default Header;
