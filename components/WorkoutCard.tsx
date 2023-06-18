import React, { Fragment, useState } from "react";
import { Workout } from "../utils/types";
import Image from "next/image";

import { BsFillPencilFill } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { Card, CardBody, Modal, ModalBody } from "@windmill/react-ui";
import { Dialog, Transition } from "@headlessui/react";

type Props = {
  workout: Workout;
};

type WorkoutSet = {
  reps: number;
  weight: number;
};

const WorkoutCard: React.FC<Props> = ({ workout }) => {
  const [isExpanded, setExpanded] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [editingSetIndex, setEditingSetIndex] = useState<number | null>(null);
  const [workoutSets, setWorkoutSets] = useState<WorkoutSet[]>([]);
  const [totalSets, setTotalSets] = useState(0);

  const handleEditSet = (index: number) => {
    setEditingSetIndex(index);
    setEditing(true);
  };

  const handleSave = (reps: number, weight: number) => {
    const newSets = [...workoutSets];
    newSets[editingSetIndex as number] = { reps, weight };
    setWorkoutSets(newSets);
    setEditing(false);
  };

  return (
    <div>
      <Card className="p-4 m-2 rounded w-72">
        <CardBody className="flex items-center">
          <div className="mr-4">
            <Image
              src={workout.image}
              alt={workout.name}
              width={40}
              height={40}
            />
          </div>
          <div>
            <p className="font-bold">{workout.name}</p>
            <button onClick={() => setExpanded(!isExpanded)}>
              <FiChevronDown
                style={{ transform: `rotate(${isExpanded ? 180 : 0}deg)` }}
              />
            </button>
            {isExpanded && (
              <div>
                {workoutSets.map((set, index) => (
                  <div
                    key={index}
                    className="bg-whitesmoke p-2 rounded-lg my-2 flex items-center justify-between"
                  >
                    <p className="text-lg">
                      Set {index + 1}: {set.reps} reps, {set.weight} kg
                    </p>
                    <button onClick={() => handleEditSet(index)}>
                      <BsFillPencilFill />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    setWorkoutSets([...workoutSets, { reps: 0, weight: 0 }]);
                    setTotalSets(totalSets + 1);
                  }}
                >
                  Add Set
                </button>
                {isEditing && (
                  <EditDialog
                    reps={workoutSets[editingSetIndex as number].reps}
                    weight={workoutSets[editingSetIndex as number].weight}
                    onSave={handleSave}
                    onClose={() => setEditing(false)}
                  />
                )}
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

type EditDialogProps = {
  reps: number;
  weight: number;
  onSave: (reps: number, weight: number) => void;
  onClose: () => void;
};

const EditDialog: React.FC<EditDialogProps> = ({
  reps,
  weight,
  onSave,
  onClose,
}) => {
  const [newReps, setNewReps] = useState(reps);
  const [newWeight, setNewWeight] = useState(weight);

  const handleSaveClick = () => {
    onSave(newReps, newWeight);
  };

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center"
        onClose={onClose}
      >
        <div className="px-4 min-h-screen text-center">
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

export default WorkoutCard;
