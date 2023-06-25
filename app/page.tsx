'use client'
import React, { useState } from "react";
import useWorkouts from "../utils/useWorkouts";
import AddWorkout from "../components/AddWorkout";
import SelectMuscle from "../components/SelectMuscle";

const Home: React.FC = () => {
  const { data, error, selectedWorkouts, setSelectedWorkouts, onDelete } = useWorkouts();
  const [showWorkout, setShowWorkout] = useState(false);

  if (error) return <div>Failed to load workouts</div>;
  if (!data) return <div>Loading...</div>;

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
