import React from "react";
import { FcAddDatabase } from "react-icons/fc";

type Props = {
  setIsAddingWorkout: (show: boolean) => void;
};

const AddWorkout: React.FC<Props> = ({ setIsAddingWorkout }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <button className="flex flex-col items-center justify-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" onClick={() => setIsAddingWorkout(true)}>
        <FcAddDatabase size={36} className="cursor-pointer" />
      </button>
    </div>
  );
};

export default AddWorkout;
