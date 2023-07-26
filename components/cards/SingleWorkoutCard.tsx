import React, { useEffect, useState } from "react";
import {
  Workout as WorkoutType,
  WorkoutSet as WorkoutSetType,
} from "../../utils/types";
import Image from "next/image";
import { Card, CardBody } from "@windmill/react-ui";
import { Menu } from "@headlessui/react";
import { FiChevronDown, FiMoreVertical } from "react-icons/fi";
import { BsFillPencilFill } from "react-icons/bs";
import { IoAddCircle } from "react-icons/io5";
import EditWorkoutCard from "./EditWorkoutCard";
import { db } from "@/utils/firebase";
import { useAuth } from "@/auth/AuthProvider";
import {
  updateDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

type Props = {
  workout: WorkoutType;
  onDelete: (id: any) => void;
};

const SingleWorkoutCard: React.FC<Props> = ({ workout, onDelete }) => {
  const { currentUser } = useAuth();
  const [isExpanded, setExpanded] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [editingSetIndex, setEditingSetIndex] = useState<number | null>(null);
  const [workoutSets, setWorkoutSets] = useState<WorkoutSetType[]>([]);

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = onSnapshot(
        doc(db, `users/${currentUser.uid}/workouts/${workout.docId}`),
        (doc) => {
          const data = doc.data();
          setWorkoutSets(data?.sets || []);
        }
      );

      return () => unsubscribe();
    }
  }, [workout.id, currentUser?.uid, db]);

  const handleAddSet = async () => {
    const newWorkoutSet = { reps: 0, weight: 0 };

    // Add the new set to local state
    setWorkoutSets((prevSets) => [...prevSets, newWorkoutSet]);

    // Add the new set to Firestore
    if (currentUser) {
      const workoutRef = doc(
        db,
        `users/${currentUser.uid}/workouts/${workout.docId}`
      );
      await updateDoc(workoutRef, {
        sets: [...workoutSets, newWorkoutSet],
      });
    } else {
      throw new Error("No authenticated user");
    }
  };

  const handleEditWorkoutSet = (index: number) => {
    setEditingSetIndex(index);
    setEditing(true);
  };

  const handleSaveSetChanges = async (newReps: number, newWeight: number) => {
    const updatedWorkoutSets = [...workoutSets];
    updatedWorkoutSets[editingSetIndex as number] = {
      reps: newReps,
      weight: newWeight,
    };
    setWorkoutSets(updatedWorkoutSets);
    setEditing(false);

    const workoutSetsRef = doc(
      db,
      `users/${currentUser?.uid}/workouts/${workout.docId}`
    );

    try {
      await setDoc(
        workoutSetsRef,
        { workoutId: workout.id, sets: updatedWorkoutSets },
        { merge: true }
      );
    } catch (error) {
      console.error("Error updating workout sets: ", error);
    }
  };

  const handleDeleteSet = async (setId: number) => {
    const updatedWorkoutSets = workoutSets.filter(
      (_, index) => index !== setId
    );
    setWorkoutSets(updatedWorkoutSets);

    const workoutSetsRef = doc(
      db,
      `users/${currentUser?.uid}/workouts/${workout.docId}`
    );
    try {
      await setDoc(
        workoutSetsRef,
        { workoutId: workout.id, sets: updatedWorkoutSets },
        { merge: true }
      );
    } catch (error) {
      console.error("Error updating workout sets: ", error);
    }
  };

  return (
    <div>
      <Card
        className="p-4 m-2 w-full sm:w-64 md:w-128 lg:w-160"
        style={{ boxShadow: "2px 2px 6px 3px #e3e6e8" }}
      >
        <CardBody className="flex flex-col items-start justify-between">
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center">
              <div className="mr-4">
                <Image
                  src={workout.image}
                  alt={workout.name}
                  width={70}
                  height={70}
                  priority
                />
              </div>
              <div>
                <p className="font-bold mr-1 truncate w-32 sm:w-auto">
                  {workout.name}
                </p>
                <p className="text-sm text-gray-500">
                  Total sets: {workoutSets.length}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <button
                onClick={() => setExpanded(!isExpanded)}
                aria-label="Toggle Expand"
              >
                <FiChevronDown size={24} />
              </button>
              <Menu as="div" className="relative ml-3">
                <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                  <FiMoreVertical size={20} />
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
                  className="border-b text-black p-2 rounded-lg my-2 flex items-center justify-between space-x-2 "
                >
                  <div className="flex flex-col items-center">
                    <label className="text-sm md:text-base">Set</label>
                    <strong>
                      <p className="text-base md:text-lg max-w-full whitespace-nowrap">
                        {index + 1}
                      </p>
                    </strong>
                  </div>
                  <div className="flex flex-col items-center">
                    <label className="text-sm md:text-base">Reps</label>
                    <strong>
                      <p className="text-base md:text-lg max-w-full whitespace-nowrap">
                        {set.reps}
                      </p>
                    </strong>
                  </div>
                  <div className="flex flex-col items-center">
                    <label className="text-sm md:text-base">Weight</label>
                    <strong>
                      <p className="text-base md:text-lg max-w-full whitespace-nowrap">
                        {set.weight}kg
                      </p>
                    </strong>
                  </div>
                  <button
                    onClick={() => handleEditWorkoutSet(index)}
                    className="p-2"
                    aria-label="Edit Set"
                  >
                    <BsFillPencilFill size={16} />
                  </button>
                </div>
              ))}
              <div className="flex flex-col items-center">
                <div className="flex flex-col items-center">
                  <IoAddCircle
                    className="cursor-pointer hover:opacity-70 text-black mt-4"
                    size={32}
                    onClick={handleAddSet}
                  />
                  <h2 className="text-center text-m sm:text-1xl mb-5">
                    Add Set
                  </h2>
                </div>
              </div>
            </div>
          )}
        </CardBody>
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
    </div>
  );
};

export default SingleWorkoutCard;
