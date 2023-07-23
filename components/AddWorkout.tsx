import React from "react";
import { BiListPlus } from "react-icons/bi";
import CurrentTime from "./CurrentTime";

type Props = {
  setShowWorkout: (show: boolean) => void;
};

const AddWorkout: React.FC<Props> = ({ setShowWorkout }) => {
  return (
    <div className="p-5 sm:p-10 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center">
        <BiListPlus
          className="text-6xl cursor-pointer w-16 h-16 hover:opacity-70"
          onClick={() => setShowWorkout(true)}
        />
      </div>
      <h2 className="text-center text-m sm:text-1xl mb-5">Add Workout</h2>

      <div className="w-full px-[3rem] till-phone:px-[5vw] h-[2rem] till-desktop:h-[4rem] flex items-center justify-center">
        <CurrentTime />
      </div>
    </div>
  );
};

export default AddWorkout;
