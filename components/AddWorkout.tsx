import React from "react";
import { BiListPlus } from "react-icons/bi";

type Props = {
  setIsAddingWorkout: (show: boolean) => void;
};

const AddWorkout: React.FC<Props> = ({ setIsAddingWorkout  }) => {
  return (
    <div className="p-5 sm:p-5 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center">
        <BiListPlus
          className="text-5xl cursor-pointer hover:opacity-70"
          onClick={() => setIsAddingWorkout (true)}
        />
      </div>
      <h2 className="text-center text-m sm:text-1xl mb-5">Add Workout</h2>
    </div>
  );
};

export default AddWorkout;
