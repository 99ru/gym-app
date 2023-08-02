import React from "react";
import useWorkouts from "@/hooks/useWorkouts";
import SingleWorkoutCard from "./SingleWorkoutCard";

const WorkoutCards: React.FC = () => {
  const { savedWorkouts, handleDeleteWorkout } = useWorkouts();

  return (
    <div className="flex flex-col items-center">
      {savedWorkouts.map((workout) => (
        <SingleWorkoutCard
          key={workout.id}
          workout={workout}
          onDelete={handleDeleteWorkout}
        />
      ))}
    </div>
  );
};

export default WorkoutCards;
