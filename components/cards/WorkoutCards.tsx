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
  
  // Format the selectedDate to "YYYY-MM-DD"
  const formattedSelectedDate = format(selectedDate, 'yyyy-MM-dd');

  // Filter the workouts based on the selected date
  const filteredWorkouts = workouts.filter((workout: Workout) => {
    if (workout.date) { // Check if date is defined
      return format(new Date(workout.date), 'yyyy-MM-dd') === formattedSelectedDate;
    } else {
      return false;
    }
  });

  return (
    <div className="flex flex-col items-center mt-16">
      {filteredWorkouts.length === 0 ? (
        <h2 className="text-lg text-center mt-4">
          No workouts added for this date📅
        </h2>
      ) : (
        filteredWorkouts.map((workout: Workout) => (
          <SingleWorkoutCard
            key={workout.id}
            workout={workout}
            onDelete={() => workout.docId && deleteWorkout(workout.docId)}
          />
        ))
      )}
    </div>
  );
};

export default WorkoutCards;
