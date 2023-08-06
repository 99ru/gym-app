import React, { useEffect, useState } from "react";
import {
  Workout as WorkoutType,
} from "../../utils/types";
import Image from "next/image";
import { Menu } from "@headlessui/react";
import { FiChevronDown, FiChevronUp, FiMoreVertical } from "react-icons/fi";
import { BsFillPencilFill } from "react-icons/bs";
import { IoAddCircle } from "react-icons/io5";
import EditWorkoutCard from "./EditWorkoutCard";
import { useAuth } from "@/auth/AuthProvider";
import useWorkouts from "@/hooks/useWorkouts";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

type Props = {
  workout: WorkoutType;
  onDelete: (id: any) => void;
};

const SingleWorkoutCard: React.FC<Props> = ({ workout, onDelete }) => {
  const { currentUser } = useAuth();
  const [isExpanded, setExpanded] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [editingSetIndex, setEditingSetIndex] = useState<number | null>(null);

  const {
    loadWorkoutSets,
    addSet,
    updateSet,
    deleteSet,
    workoutSets
  } = useWorkouts();

 useEffect(() => {
    if (currentUser && workout.docId) { // Ensure workout.docId is defined
        const unsubscribe = loadWorkoutSets(workout.docId);
        return () => unsubscribe && unsubscribe();
    }
}, [workout.docId, currentUser?.uid]);


  const handleAddSet = async () => {
    if (!workout.docId) return; 
    const newWorkoutSet = { reps: 0, weight: 0 };
    await addSet(workout.docId, newWorkoutSet);
};

  const handleEditWorkoutSet = (index: number) => {
    setEditingSetIndex(index);
    setEditing(true);
  };

 const handleSaveSetChanges = async (newReps: number, newWeight: number) => {
    if (!workout.docId) return; 
    await updateSet(workout.docId, editingSetIndex as number, {
        reps: newReps,
        weight: newWeight
    });
    setEditing(false);
};


  const handleDeleteSet = async (setId: number) => {
    if (!workout.docId) return; 
    await deleteSet(workout.docId, setId);
};

  return (
    <>
      <Card className="bg-pch p-4 m-2 sm:w-96 md:w-144">
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="md:mr-4">
                <Image
                  src={workout.image}
                  alt={workout.name}
                  width={90}
                  height={90}
                  priority
                />
              </div>
              <div>
                <p className="font-bold text-lg md:text-xl lg:text-2xl truncate">
                  {workout.name}
                </p>

                <div className="flex items-center">
                  <p className="text-sm md:text-lg lg:text-xl text-gray-700 mr-2">
                    Total sets: {workoutSets.length}
                  </p>
                  <button
                    onClick={() => setExpanded(!isExpanded)}
                    className="hover:bg-gray-200 rounded"
                    aria-label="Toggle Expand"
                  >
                    {isExpanded ? (
                      <FiChevronUp size={24} />
                    ) : (
                      <FiChevronDown size={24} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <Menu as="div" className="relative mt-6">
                <Menu.Button>
                  <FiMoreVertical size={24} />
                </Menu.Button>
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-20 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-gray-100" : ""
                        } block px-4 py-2 text-sm text-gray-700 text-center`}
                        onClick={() => onDelete(workout.docId)}
                      >
                        Delete
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
          </div>
          {isExpanded && (
            <div className="w-full">
              {workoutSets.map((set, index) => (
                <div
                  key={index}
                  className="border-b text-black p-2 rounded-lg my-2 flex items-center justify-between space-x-2"
                >
                  <div className="flex flex-col items-center">
                    <label className="text-sm md:text-base">Set</label>
                    <strong>
                      <p className="text-base max-w-full whitespace-nowrap">
                        {index + 1}
                      </p>
                    </strong>
                  </div>
                  <div className="flex flex-col items-center">
                    <label className="text-sm md:text-base">Reps</label>
                    <strong>
                      <p className="text-base max-w-full whitespace-nowrap">
                        {set.reps}
                      </p>
                    </strong>
                  </div>
                  <div className="flex flex-col items-center">
                    <label className="text-sm md:text-base">Weight</label>
                    <strong>
                      <p className="text-base max-w-full whitespace-nowrap">
                        {set.weight}kg
                      </p>
                    </strong>
                  </div>
                  <button onClick={() => handleEditWorkoutSet(index)}>
                    <BsFillPencilFill size={16} />
                  </button>
                </div>
              ))}
              <div className="flex flex-col items-center">
                <div
                  className="flex flex-col items-center cursor-pointer"
                  onClick={handleAddSet}
                >
                  <IoAddCircle
                    className="hover:opacity-70 text-black mt-8"
                    size={32}
                  />
                  <h2 className="text-center uppercase text-base md:text-lg mb-5">
                    Add Set
                  </h2>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {isEditing &&
        editingSetIndex !== null &&
        editingSetIndex < workoutSets.length && (
          <EditWorkoutCard
            setId={editingSetIndex}
            reps={workoutSets[editingSetIndex].reps}
            weight={workoutSets[editingSetIndex].weight}
            onSave={handleSaveSetChanges}
            onDelete={handleDeleteSet}
            onClose={() => setEditing(false)}
          />
        )}
    </>
  );
};

export default SingleWorkoutCard;
