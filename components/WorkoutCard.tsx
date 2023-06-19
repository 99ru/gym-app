import React, { useState } from "react";
import { Workout } from "../utils/types";
import Image from "next/image";
import EditWorkoutCard from "./EditWorkoutCard";
import { Card, CardBody } from "@windmill/react-ui";
import { BsFillPencilFill, BsTrash } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { IoAddCircle } from "react-icons/io5";

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
    <Card className="p-4 m-2 w-full sm:w-64 md:w-72 lg:w-160 shadow-md



">
      <div>
        <CardBody className="flex flex-col items-start justify-between">
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center">
              <div className="mr-4">
                <Image src={workout.image} alt={workout.name} width={70} height={40} />
              </div>
              <p className="font-bold text-lg">{workout.name}</p>
            </div>
            <div className="flex items-center">
              <button onClick={() => setExpanded(!isExpanded)}>
                <FiChevronDown size={16} />
              </button>
              <div className="ml-4 cursor-pointer">
                <BsTrash size={16} className="cursor-pointer hover:opacity-70" />
              </div>
            </div>
          </div>
          {isExpanded && (
            <div className="w-full">
              {workoutSets.map((set, index) => (
                <div
                  key={index}
                  className="bg-e5edff p-2 rounded-lg my-2 flex items-center justify-between space-x-2 bg-slate-50"
                >
                  <div className="flex items-center space-x-2 bg-whitesmoke p-4">
                    <p className="text-base md:text-lg w-20">Set {index + 1}</p>
                    <p className="text-base md:text-lg w-20">{set.weight}kg</p>
                    <p className="text-base md:text-lg w-20">{set.reps} Reps</p>
                  </div>
                  <button onClick={() => handleEditSet(index)} className="p-2">
                    <BsFillPencilFill size={16} />
                  </button>
                </div>
              ))}
              <div className="flex flex-col items-center">
                <IoAddCircle
                  className="cursor-pointer hover:opacity-70"
                  size={32}
                  onClick={() => {
                    setWorkoutSets([...workoutSets, { reps: 0, weight: 0 }]);
                    setTotalSets(totalSets + 1);
                  }}
                />
                <h1 className="text-base md:text-lg text-center">Add Set</h1>
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
