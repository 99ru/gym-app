import React, { useState, useCallback } from "react";
import { Workout } from "../../utils/types";
import { useAuth } from "../../auth/AuthProvider";
import useWorkouts from "../../hooks/useWorkouts";
import MuscleButton from "../MuscleButton";
import WorkoutDialog from "../dialogs/SelectWorkoutDialog";
import { IoCloseSharp } from "react-icons/io5";
import { formatISO } from "date-fns";

type Props = {
  workouts: Workout[];
  setIsAddingWorkout: (show: boolean) => void;
  selectedDate: Date; 
};

const SelectWorkout: React.FC<Props> = ({
  workouts,
  setIsAddingWorkout,
  selectedDate,
}) => {
  const { currentUser } = useAuth();
  const { workouts: selectedWorkouts, saveWorkout } = useWorkouts();

  const [state, setState] = useState<{
    selectedMuscle: string | null;
    open: boolean;
  }>({ selectedMuscle: null, open: false });

  const { selectedMuscle, open } = state;

  const handleDialogClose = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      selectedMuscle: null,
      open: false,
    }));
    setIsAddingWorkout(false);
  }, [setIsAddingWorkout]);

  const handleMuscleButtonClick = useCallback((muscle: string) => {
    setState({ selectedMuscle: muscle, open: true });
  }, []);

  const handleAddWorkout = async (workout: Workout) => {
    if (currentUser) {
      // Check if the workout exists in Firestore
      if (
        !selectedWorkouts.some(
          (selectedWorkout) => selectedWorkout.id === workout.id
        )
      ) {
        const workoutWithSets = {
          ...workout,
          sets: [{ reps: 0, weight: 0 }],
          date: formatISO(selectedDate, { representation: "date" }), 
        };

        await saveWorkout(workoutWithSets); 
        handleDialogClose();
        setIsAddingWorkout(false);
      } else {
        console.log("This workout has already been added");
      }
    } else {
      throw new Error("No authenticated user");
    }
  };

  const musclesGroups = [
    "Shoulders",
    "Biceps",
    "Triceps",
    "Legs",
    "Back",
    "Chest",
    "Abs",
    "Full Body",
  ];

  return (
    <section className="flex justify-center mt-20">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 text-center relative">
        <h1 className="font-bold text-2xl mb-6">Select a muscle group</h1>
        <div className="flex flex-wrap justify-center mb-6">
          {musclesGroups.map((muscle) => (
            <MuscleButton
              key={muscle}
              muscle={muscle}
              selectedMuscle={selectedMuscle}
              onClick={handleMuscleButtonClick}
            />
          ))}
        </div>
        <IoCloseSharp
          onClick={handleDialogClose}
          className="absolute top-2 right-2 cursor-pointer text-2xl text-gray-500"
        />
        <WorkoutDialog
          open={open}
          selectedMuscle={selectedMuscle}
          workouts={workouts}
          onClose={handleDialogClose}
          onWorkoutClick={handleAddWorkout}
        />
      </div>
    </section>
  );
};

export default SelectWorkout;
