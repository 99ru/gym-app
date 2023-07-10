'use client'
import React, { useState } from "react";
import workoutData from "../utils/workoutData";
import AddWorkout from "../components/AddWorkout";
import SelectMuscle from "../components/SelectMuscle";

const Home: React.FC = () => {

  const { data, selectedWorkouts, setSelectedWorkouts, onDelete } = workoutData();
  const [showWorkout, setShowWorkout] = useState(false);

  return (
    <>
      {!showWorkout && (
        <AddWorkout
          showWorkout={showWorkout}
          setShowWorkout={setShowWorkout}
          selectedWorkouts={selectedWorkouts}
          onDelete={onDelete}
        />
      )}
      {showWorkout && (
        <SelectMuscle
          workouts={data.workouts}
          setSelectedWorkouts={setSelectedWorkouts}
          setShowWorkout={setShowWorkout}
        />
      )}
    </>
  );
};

export default Home;
