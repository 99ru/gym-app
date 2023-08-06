import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import { Workout } from "../../utils/types";

type WorkoutDialogProps = {
  open: boolean;
  selectedMuscle: string | null;
  workouts: Workout[];
  onClose: () => void;
  onWorkoutClick: (workout: Workout) => Promise<void>;
};

const WorkoutDialog: React.FC<WorkoutDialogProps> = ({
  open,
  selectedMuscle,
  workouts,
  onClose,
  onWorkoutClick,
}) => (
  <Transition appear show={open} as="div">
    <Dialog
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center"
      onClose={onClose}
    >
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

      <div className="inline-block w-full max-w-3xl p-6 overflow-y-auto text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl h-auto max-h-screen">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <IoCloseSharp className="w-5 h-5" />
          </button>
        </div>

        <Dialog.Title
          as="h3"
          className="text-xl font-bold leading-6 text-gray-900 mb-4"
        >
          {selectedMuscle} workouts
        </Dialog.Title>

        <div className="mt-2 space-y-4 overflow-auto">
          {workouts
            .filter((workout) => workout.muscle === selectedMuscle)
            .map((workout) => (
              <div
                key={workout.id}
                className="flex items-center space-x-4 cursor-pointer p-2 rounded-md hover:bg-gray-100"
                onClick={() => onWorkoutClick(workout)}
              >
                <div className="flex-shrink-0">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                    priority
                  />
                </div>
                <div>
                  <p className="text-base font-medium text-gray-900">
                    {workout.name}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Dialog>
  </Transition>
);

export default WorkoutDialog;
