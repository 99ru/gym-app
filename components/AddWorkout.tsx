import React from "react";
import { IoAddCircle } from "react-icons/io5";
import WorkoutCard from "../components/WorkoutCard";
import { Workout } from "../utils/types";

type Props = {
  showWorkout: boolean;
  setShowWorkout: (show: boolean) => void;
  selectedWorkouts: Workout[];
  onDelete: (id: number) => void;
};

const AddWorkout: React.FC<Props> = ({ showWorkout, setShowWorkout, selectedWorkouts, onDelete }) => {
  return (
    <div className="p-5 sm:p-10 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center">
        <IoAddCircle
          className="text-6xl text-dodgerblue cursor-pointer w-16 h-16 hover:opacity-70"
          onClick={() => setShowWorkout(true)}
        />
      </div>
      <h2 className="text-center text-m sm:text-1xl mb-5">Add Workout</h2>

      <div className="flex flex-col items-center w-full">
        {selectedWorkouts.length > 0 ? (
          selectedWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} onDelete={onDelete} />
          ))
        ) : (
          <p className="text-gray-500">Click on the &apos;Add Workout&apos; above to get started.</p>

        )}
      </div>
    </div>
  );
};

export default AddWorkout;
