import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Workout } from "../utils/types";

type Props = {
  workouts: Workout[]
  setSelectedWorkouts: React.Dispatch<React.SetStateAction<Workout[]>>
  setShowWorkout: (show: boolean) => void
}

const SelectMuscle: React.FC<Props> = ({
  workouts,
  setSelectedWorkouts,
  setShowWorkout,
}) => {
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const muscles = ["Shoulders", "Biceps", "Triceps", "Legs", "Back", "Chest", "Abs", "Full Body"];
  const SelectMuscle = selectedMuscle
    ? workouts.filter((workout) => workout.muscle === selectedMuscle)
    : [];

  const handleButtonClick = (muscle: string) => {
    setSelectedMuscle(muscle);
    setOpen(true);
  };

  const handleWorkoutClick = (workout: Workout) => {
    setSelectedWorkouts((prevWorkouts) => [...prevWorkouts, workout]);
    setOpen(false);
    setShowWorkout(false);
  };

  return (
    <section className="flex flex-wrap justify-center mt-20">
      {muscles.map((muscle) => (
        <button
          key={muscle}
          onClick={() => handleButtonClick(muscle)}
          className="bg-black text-white m-2 p-2 rounded"
        >
          {muscle}
        </button>
      ))}

      <Transition appear show={open} as="div">
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setOpen(false)}
        >
          <div className="px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

            <span
              className="inline-block align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {selectedMuscle} workouts
              </Dialog.Title>

              <div className="mt-2 space-y-4">
                {SelectMuscle.map((workout) => (
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
