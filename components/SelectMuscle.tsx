import { useState } from "react";
import { Workout } from "../utils/types";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useAuth } from "../auth/AuthProvider";
import useWorkoutsData from "../utils/workoutData";
import MuscleButton from "./MuscleButton";
import WorkoutDialog from "./WorkoutDialog";
import { IoCloseSharp } from "react-icons/io5";

type Props = {
  workouts: Workout[];
  setIsAddingWorkout: (show: boolean) => void;
};

const SelectMuscle: React.FC<Props> = ({ workouts, setIsAddingWorkout }) => {
  const { currentUser } = useAuth();
  const { selectedWorkouts } = useWorkoutsData();
  const [state, setState] = useState<{
    selectedMuscle: string | null;
    open: boolean;
  }>({ selectedMuscle: null, open: false });
  const muscles = [
    "Shoulders",
    "Biceps",
    "Triceps",
    "Legs",
    "Back",
    "Chest",
    "Abs",
    "Full Body",
  ];

  const handleButtonClick = (muscle: string) => {
    setState({ selectedMuscle: muscle, open: true });
  };

  const handleCloseClick = () => {
    console.log("Close button clicked");
  };

  const handleWorkoutClick = async (workout: Workout) => {
    if (currentUser) {
      if (
        !selectedWorkouts.some(
          (selectedWorkout) => selectedWorkout.id === workout.id
        )
      ) {
        await addDoc(
          collection(db, `users/${currentUser.uid}/workouts`),
          workout
        );
        setState({ selectedMuscle: null, open: false });
        setIsAddingWorkout(false);
      } else {
        console.log("This workout has already been added");
      }
    } else {
      throw new Error("No authenticated user");
    }
  };

  const handleClose = () => {
    setState({ selectedMuscle: null, open: false });
    setIsAddingWorkout(false);
  };

  return (
    <section className="flex justify-center mt-20">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 text-center relative">
        <h1 className="font-bold text-2xl mb-6">Select a muscle group</h1>
        <div className="flex flex-wrap justify-center mb-6">
          {muscles.map((muscle) => (
            <MuscleButton
              key={muscle}
              muscle={muscle}
              selectedMuscle={state.selectedMuscle}
              onClick={handleButtonClick}
            />
          ))}
        </div>
        <IoCloseSharp
          onClick={handleClose}
          className="absolute top-2 right-2 cursor-pointer text-2xl text-gray-500"
        />
        <WorkoutDialog
          open={state.open}
          selectedMuscle={state.selectedMuscle}
          workouts={workouts}
          onClose={handleClose}
          onWorkoutClick={handleWorkoutClick}
        />
      </div>
    </section>
  );
};

export default SelectMuscle;
