import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

type Props = {
  reps: number;
  weight: number;
  onSave: (reps: number, weight: number) => void;
  onClose: () => void;
};

const EditWorkoutCard: React.FC<Props> = ({ reps, weight, onSave, onClose }) => {
  const [newReps, setNewReps] = useState(reps);
  const [newWeight, setNewWeight] = useState(weight);

  const handleSaveClick = () => {
    onSave(newReps, newWeight);
  };

  return (
    <Transition appear show={true} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center"
        onClose={onClose}
      >
        <div className="px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <h3 className="text-2xl font-semibold text-black mb-4">Edit Set</h3>
            <div className="flex bg-gray-50 dark:bg-black p-2 rounded-lg sm:flex-row justify-around text-gray-600 dark:text-gray-300">
              <div>
                <div className="text-center pb-2 text-base font-semibold">
                  <label>Weight</label>
                </div>
                <div className="flex justify-center pb-2">
                  <input
                    type="number"
                    value={newWeight}
                    onChange={(e) => setNewWeight(parseInt(e.target.value))}
                    className="py-2 rounded w-1/2 border text-black text-center"
                  />
                </div>
              </div>
              <div>
                <div className="text-center pb-2 text-base font-semibold">
                  <label>Reps</label>
                </div>
                <div className="flex justify-center ">
                  <input
                    type="number"
                    value={newReps}
                    onChange={(e) => setNewReps(parseInt(e.target.value))}
                    className="py-2 rounded w-1/2 border text-black text-center"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                onClick={handleSaveClick}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditWorkoutCard;
