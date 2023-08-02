import React from "react";
import useWorkouts from "@/hooks/useWorkouts";
import SingleWorkoutCard from "./SingleWorkoutCard";
import { Workout } from "@/utils/types"; 

const WorkoutCards: React.FC = () => {

  // Use workouts and deleteWorkout instead of savedWorkouts and handleDeleteWorkout
      const { workouts, deleteWorkout } = useWorkouts();


  return (
    <div className="flex flex-col items-center">

      {workouts.map(
        (workout: Workout) => (
          <SingleWorkoutCard
            key={workout.id}
            workout={workout}
            onDelete={() => workout.docId && deleteWorkout(workout.docId)}
          />
        )
      )}
    </div>
  );
};

export default WorkoutCards;
