import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Workout } from "../utils/types";
import { IoCloseSharp } from "react-icons/io5";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useAuth } from "../auth/AuthProvider";
import useWorkoutsData from "../utils/workoutData";

type Props = {
  workouts: Workout[];
  setShowWorkout: (show: boolean) => void;
};

const SelectMuscle: React.FC<Props> = ({ workouts, setShowWorkout }) => {
  const { currentUser } = useAuth();
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
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

  const { selectedWorkouts } = useWorkoutsData();

  const handleButtonClick = (muscle: string) => {
    setSelectedMuscle(muscle);
    setOpen(true);
  };

  const handleWorkoutClick = async (workout: Workout) => {
    if (currentUser !== null) {
      if (
        !selectedWorkouts.some(
          (selectedWorkout) => selectedWorkout.id === workout.id
        )
      ) {
        await addDoc(
          collection(db, `users/${currentUser.uid}/workouts`),
          workout
        );
        setOpen(false);
        setShowWorkout(false);
      } else {
        console.log("This workout has already been added");
      }
    } else {
      console.log("No authenticated user");
    }
  };

  const handleClose = () => {
    setSelectedMuscle(null);
    setOpen(false);
    setShowWorkout(false);
  };

  return (
    <section className="flex flex-wrap justify-center mt-20">
      {muscles.map((muscle) => (
        <button
          key={muscle}
          onClick={() => handleButtonClick(muscle)}
          className={`bg-black text-white m-2 p-2 rounded ${
            selectedMuscle === muscle ? "bg-blue-500" : ""
          }`}
        >
          {muscle}
        </button>
      ))}

      <Transition appear show={open} as="div">
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={handleClose}
        >
          <div className="px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

            <span className="inline-block align-middle" aria-hidden="true">
              &#8203;
            </span>

            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="flex justify-end">
                <button
                  onClick={handleClose}
                  className="text-black hover:text-gray-500"
                >
                  <IoCloseSharp className="w-5 h-5" />
                </button>
              </div>

              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {selectedMuscle} workouts
              </Dialog.Title>

              <div className="mt-2 space-y-4">
                {workouts
                  .filter((workout) => workout.muscle === selectedMuscle)
                  .map((workout) => (
                    <div
                      key={workout.id}
                      className="flex items-center space-x-4 cursor-pointer"
                      onClick={() => handleWorkoutClick(workout)}
                    >
                      <div className="flex-shrink-0">
                        <Image
                          src={workout.image}
                          alt={workout.name}
                          width={30}
                          height={30}
                          className="rounded-full"
                          priority
                        />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-gray-900">
                          {workout.name}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </section>
  );
};

export default SelectMuscle;
