import React, { useState, useCallback } from "react";
import { Workout } from "../../utils/types";
import { useAuth } from "../../auth/AuthProvider";
import useWorkouts from "../../hooks/useWorkouts";
import MuscleButton from "./MuscleButton";
import WorkoutDialog from "../dialogs/SelectWorkoutDialog";
import { IoCloseSharp } from "react-icons/io5";
import { formatISO } from "date-fns";
import { Dialog, Transition } from "@headlessui/react";

// Define muscle groups as enums
export enum MuscleGroups {
  Shoulders = 'Shoulders',
  Biceps = 'Biceps',
  Triceps = 'Triceps',
  Legs = 'Legs',
  Back = 'Back',
  Chest = 'Chest',
  Abs = 'Abs',
  FullBody = 'Full Body',
}

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
    selectedMuscle: MuscleGroups | null;
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

  const handleMuscleButtonClick = useCallback((muscle: MuscleGroups) => {
    setState({ selectedMuscle: muscle, open: true });
  }, []);

  // Async function with error handling
  const handleAddWorkout = useCallback(async (workout: Workout) => {
    try {
      if (currentUser) {
        // Check if the workout exists in Firestore
        if (
          !selectedWorkouts.some(
            (selectedWorkout) => selectedWorkout.id === workout.id && selectedWorkout.date === formatISO(selectedDate, { representation: "date" })
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
          alert("This workout has already been added"); // Use a better notification system here
        }
      } else {
        throw new Error("No authenticated user");
      }
    } catch (error) {
      console.error(error); // Handle error appropriately
    }
  }, [currentUser, handleDialogClose, setIsAddingWorkout, selectedWorkouts, saveWorkout, selectedDate]);

  // Using enum to define muscle groups
  const musclesGroups = Object.values(MuscleGroups);

   return (
    <Transition appear show={true} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={handleDialogClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            {selectedMuscle === null ? (
              <>
                <Dialog.Title as="h1" className="font-bold text-2xl mb-6 text-center">
                  Select a muscle group
                </Dialog.Title>
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
              </>
            ) : (
              <WorkoutDialog
                open={open}
                selectedMuscle={selectedMuscle}
                workouts={workouts}
                onClose={handleDialogClose}
                onWorkoutClick={handleAddWorkout}
              />
            )}
            <IoCloseSharp
              onClick={handleDialogClose}
              className="absolute top-2 right-2 cursor-pointer text-2xl text-gray-500"
            />
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SelectWorkout;
