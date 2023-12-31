import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BsTrash } from "react-icons/bs";

type Props = {
  setId: number;
  reps: number;
  weight: number;
  onSave: (reps: number, weight: number) => void;
  onDelete: (setId: number) => void;
  onClose: () => void;
};

const EditWorkoutCard: React.FC<Props> = ({
  setId,
  reps,
  weight,
  onSave,
  onDelete,
  onClose,
}) => {
  const [newReps, setNewReps] = useState(reps);
  const [newWeight, setNewWeight] = useState(weight);

  const handleSaveWorkoutSet = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(newReps, newWeight);
  };

  const handleDeleteWorkoutSet = () => {
    onDelete(setId);
  };

  return (
    <Transition appear show={true} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center"
        onClose={onClose}
      >
        <div className="px-4 text-center relative">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
            <form onSubmit={handleSaveWorkoutSet}>
              <h3 className="text-2xl font-semibold text-black mb-4">
                Edit Set
              </h3>
              <div className="flex p-2 rounded-lg flex-row text-gray-600 dark:text-gray-300">
                <div>
                  <div className="text-center pb-2 text-base font-semibold">
                    <label>Weight</label>
                  </div>

                  <div className="flex justify-center pb-2 sm:pb-0">
                    <input
                      type="number"
                      value={newWeight > 0 ? newWeight : ""}
                      min={0}
                      onChange={(e) => {
                        if (/^\d*$/.test(e.target.value)) {
                          setNewWeight(Math.max(0, parseInt(e.target.value)));
                        }
                      }}
                      className="py-2 rounded w-full sm:w-1/2 border text-black text-center"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div>
                  <div className="text-center pb-2 text-base font-semibold">
                    <label>Reps</label>
                  </div>
                  <div className="flex justify-center pb-2 sm:pb-0">
                    <input
                      type="number"
                      value={newReps > 0 ? newReps : ""}
                      min={0}
                      onChange={(e) => {
                        if (/^\d*$/.test(e.target.value)) {
                          setNewReps(Math.max(0, parseInt(e.target.value)));
                        }
                      }}
                      className="py-2 rounded w-full sm:w-1/2 border text-black text-center"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                >
                  Save
                </button>
                <button
                  type="button"
                  aria-label="Delete Set"
                  className="cursor-pointer hover:opacity-70 text-black"
                  onClick={handleDeleteWorkoutSet}
                >
                  <BsTrash size={20} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditWorkoutCard;
