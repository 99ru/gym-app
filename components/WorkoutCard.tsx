import React, { useState } from "react";
import { Workout } from "../utils/types";
import Image from "next/image";
import { Card, CardBody } from "@windmill/react-ui";
import { BsFillPencilFill } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import EditWorkoutCard from "./EditWorkoutCard";

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
    <Card className="p-4 m-2 rounded min-w-[700px]">
      <CardBody className="flex items-center">
        <div className="mr-4">
          <Image
            src={workout.image}
            alt={workout.name}
            width={100}
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
            <div >
              {workoutSets.map((set, index) => (
                <div 
                  key={index}
                  className="bg-e5edff p-2 rounded-lg my-2 flex items-center justify-between space-x-2 bg-slate-50"
                >
                  <div className="flex items-center space-x-2 bg-whitesmoke ">
                    <p className="text-lg ml-2 w-20">Set {index + 1}</p>
                    <p className="text-lg ml-2 w-20">{set.weight}kg</p>
                    <p className="text-lg ml-2 w-20">{set.reps} Reps</p>
                  </div>
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
            </div>
          )}
        </div>
      </CardBody>
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
}

export default WorkoutCard;
