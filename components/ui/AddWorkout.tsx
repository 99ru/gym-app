import React from "react";
import { FcAddDatabase } from "react-icons/fc";

type Props = {
  setIsAddingWorkout: (show: boolean) => void;
};

const AddWorkout: React.FC<Props> = ({ setIsAddingWorkout }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <button className="flex flex-col items-center justify-center" onClick={() => setIsAddingWorkout(true)}>
        <FcAddDatabase size={40} className="cursor-pointer hover:opacity-70" />
        <p className="text-center text-black text-m sm:text-1xl mb-5 font-bold">Workout</p>
      </button>
    </div>
  );
};

export default AddWorkout;
