'use client';
import React, { useState } from 'react';
import { IoAddCircle } from 'react-icons/io5';
import BodyPartsSelect from './BodyPartsSelect';
import { useWorkouts } from "../../WorkoutContext";

export default function AddWorkout() {
  const workouts = useWorkouts();
  const [showBodyPartSelection, setShowBodyPartSelection] = useState(false);

  const handleAddWorkoutClick = () => {
    setShowBodyPartSelection(true);
  };

  const handleBodyPartSelection = (selectedBodyPart: string) => {
    console.log('Selected body part:', selectedBodyPart);
  };

  return (
    <>
      <div className="flex flex-col items-center h-screen p-20">
        <IoAddCircle
          className="text-6xl text-black cursor-pointer"
          onClick={handleAddWorkoutClick}
        />
        <h1 className="text-center">Add Workout</h1>
        <div className="add-msg">
          <h1>Click on the 'Add Workout' to get started</h1>
        </div>

        {showBodyPartSelection && (
          <BodyPartsSelect onSelection={handleBodyPartSelection} workouts={workouts} />
        )}
      </div>
    </>
  );
}
