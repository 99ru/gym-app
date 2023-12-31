import React from "react";
import useWorkouts from "@/hooks/useWorkouts";
import SingleWorkoutCard from "./SingleWorkoutCard";
import { Workout } from "@/utils/types";
import { format } from "date-fns"; // import the format function from date-fns

interface WorkoutCardsProps {
  selectedDate: Date;
}

const WorkoutCards: React.FC<WorkoutCardsProps> = ({ selectedDate }) => {
  const { workouts, deleteWorkout } = useWorkouts();
  const formattedSelectedDate = format(selectedDate, "yyyy-MM-dd");

  const filteredWorkouts = workouts.filter((workout: Workout) => {
    if (workout.date) {
      return (
        format(new Date(workout.date), "yyyy-MM-dd") === formattedSelectedDate
      );
    } else {
      return false;
    }
  });

  return (
      <div className="flex flex-col items-center mt-4 mb-16 md:mt-24 md:mb-48">
        {filteredWorkouts.length === 0 ? (
          <h2 className="text-lg text-center mt-4">
            No workouts added for this date.
          </h2>
        ) : (
        
          filteredWorkouts.map((workout: Workout, index: number) => (
            <SingleWorkoutCard
              key={workout.id}
              workout={workout}
              index={index}
              onDelete={() => workout.docId && deleteWorkout(workout.docId)}
            />
          ))
        )}
        
      </div>
  );
};

export default WorkoutCards;
