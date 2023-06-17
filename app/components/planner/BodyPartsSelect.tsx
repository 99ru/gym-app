import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface BodyPartsSelectProps {
  onSelection: (selectedBodyPart: string) => void;
  workouts: any[];
}

const BodyPartsSelect: React.FC<BodyPartsSelectProps> = ({
  onSelection,
  workouts,
}) => {
  const bodyParts = [
    "Shoulders",
    "Biceps",
    "Legs",
    "Back",
    "Forearms",
    // Add more body parts as needed
  ];

  const [selectedBodyPart, setSelectedBodyPart] = useState("");
  const handleBodyPartClick = (bodyPart: string) => {
    setSelectedBodyPart(bodyPart);
    onSelection(bodyPart);
  };

  return (
    <div className="flex justify-center flex-wrap">
      {bodyParts.map((bodyPart) => (
        <div key={bodyPart} onClick={() => handleBodyPartClick(bodyPart)}>
          <button className="text-sm md:text-base shadow-lg m-1.5 h-10 px-5 sm:m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-full focus:shadow-outline hover:bg-indigo-800">
            {bodyPart}
          </button>
        </div>
      ))}

      <Transition.Root show={selectedBodyPart !== ""} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={() => setSelectedBodyPart("")}
        >
          <div className="flex items-center justify-center min-h-screen px-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Workouts for {selectedBodyPart}
                  <button onClick={() => setSelectedBodyPart("")}>Close</button>
                </Dialog.Title>
                <div className="mt-4 max-h-80 overflow-y-auto">
                  {workouts.map((workout) => {
                    console.log("Workout:", workout);
                    if (workout.muscle === selectedBodyPart) {
                      return (
                        <div key={workout.id}>
                          <h1>{workout.name}</h1>
                          <p>{workout.description}</p>
                          <img
                            src={workout.image}
                            alt={workout.name}
                            width={200}
                            height={200}
                          />
                          {/* Add other workout details */}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default BodyPartsSelect;
