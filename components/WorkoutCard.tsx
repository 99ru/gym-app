import React, { useState, useEffect } from "react";
import { Workout } from "../utils/types";
import Image from "next/image";
import EditWorkoutCard from "./EditWorkoutCard";
import { Card, CardBody } from "@windmill/react-ui";
import { BsFillPencilFill, BsTrash } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { IoAddCircle } from "react-icons/io5";

type Props = {
  workout: Workout;
  onDelete: (id: any) => void;
};

type WorkoutSet = {
  reps: number;
  weight: number;
};

const WorkoutCard: React.FC<Props> = ({ workout, onDelete }) => {
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
    localStorage.setItem(`workoutSets-${workout.id}`, JSON.stringify(newSets));
  };

  useEffect(() => {
    const savedSets = localStorage.getItem(`workoutSets-${workout.id}`);
    if (savedSets) {
      setWorkoutSets(JSON.parse(savedSets));
    }
  }, []);

  return (
    <div>
      <Card className="p-4 m-2 w-full sm:w-64 md:w-128 lg:w-160 shadow-md">
        <div>
          <CardBody className="flex flex-col items-start justify-between">
            <div className="flex items-center w-full justify-between">
              <div className="flex items-center">
                <div className="mr-4">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    width={100}
                    height={100}
                    priority
                  />
                </div>
                <p className="font-bold text-lg">{workout.name}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => setExpanded(!isExpanded)}
                  aria-label="Toggle Expand"
                >
                  <FiChevronDown size={24} />
                </button>
                <button
                  className="ml-4 cursor-pointer"
                  onClick={() => onDelete(workout.id)}
                  aria-label="Delete Workout"
                >
                  <BsTrash
                    size={16}
                    className="cursor-pointer hover:opacity-70 text-black"
                  />
                </button>
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
                      onClick={() => handleEditSet(index)}
                      className="p-2"
                      aria-label="Edit Set"
                    >
                      <BsFillPencilFill size={16} />
                    </button>
                  </div>
                ))}
                <div className="flex flex-col items-center">
                  <IoAddCircle
                    className="cursor-pointer hover:opacity-70 text-dodgerblue mt-4"
                    size={32}
                    onClick={() => {
                      const newWorkoutSets = [
                        ...workoutSets,
                        { reps: 0, weight: 0 },
                      ];
                      setWorkoutSets(newWorkoutSets);
                      setTotalSets(totalSets + 1);
                      localStorage.setItem(
                        `workoutSets-${workout.id}`,
                        JSON.stringify(newWorkoutSets)
                      );
                    }}
                  />

                  <h2 className="text-center text-m sm:text-1xl mb-5">
                    Add Set
                  </h2>
                </div>
              </div>
            )}
          </CardBody>
        </div>
      </Card>
      {isEditing && (
        <EditWorkoutCard
          reps={workoutSets[editingSetIndex as number].reps}
          weight={workoutSets[editingSetIndex as number].weight}
          onSave={handleSave}
          onClose={() => setEditing(false)}
        />
      )}
    </div>
  );
};

export default WorkoutCard;
