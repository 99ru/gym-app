import { useEffect, useState } from "react";
import { Workout } from "./types";
import workoutData from './workoutData.json';

export default function dataWorkouts() {
  const [selectedWorkouts, setSelectedWorkouts] = useState<Workout[]>([]);

  const onDelete = (id: number) => {
    setSelectedWorkouts(prevWorkouts =>
      prevWorkouts.filter(workout => workout.id !== id)
    );
  };

  useEffect(() => {
    const savedWorkouts = localStorage.getItem("selectedWorkouts");
    if (savedWorkouts) {
      setSelectedWorkouts(JSON.parse(savedWorkouts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedWorkouts", JSON.stringify(selectedWorkouts));
  }, [selectedWorkouts]);

  return {
    data: workoutData,
    selectedWorkouts,
    setSelectedWorkouts,
    onDelete,
  };
}
