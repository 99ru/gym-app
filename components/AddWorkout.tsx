import React from 'react';
import { IoAddCircle } from 'react-icons/io5';
import WorkoutCard from '../components/WorkoutCard';
import { Workout } from '../utils/types';

type Props = {
  showWorkout: boolean;
  setShowWorkout: (show: boolean) => void;
  selectedWorkouts: Workout[];
};

const AddWorkout: React.FC<Props> = ({ showWorkout, setShowWorkout, selectedWorkouts }) => {
  return (
    <div className="p-5 sm:p-10 flex flex-col items-center justify-center mt-20">
      <div className="flex items-center justify-center">
        <IoAddCircle
          className="text-6xl text-black cursor-pointer w-16 h-16"
          onClick={() => setShowWorkout(true)}
        />
      </div>
      <h1 className="text-center text-2xl sm:text-3xl mb-5">Add Workout</h1>
<div className="flex flex-col items-center w-full">
  {selectedWorkouts.map((workout) => (
    <WorkoutCard key={workout.id} workout={workout} />
  ))}
</div>
    </div>
  );
};

export default AddWorkout;
