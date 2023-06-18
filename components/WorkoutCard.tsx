import React, { useState } from "react";
import { Workout } from "../utils/types";
import Image from "next/image";
import { Card, CardBody } from "@windmill/react-ui";
import { BsFillPencilFill } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import EditDialog from "./EditWorkoutCard";

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
            <Image src={workout.image} alt={workout.name} width={40} height={40} />
          </div>
          <div>
            <p className="font-bold">{workout.name}</p>
            <button onClick={() => setExpanded(!isExpanded)}>
              <FiChevronDown style={{ transform: `rotate(${isExpanded ? 180 : 0}deg)` }} />
            </button>
            {isExpanded && (
              <div>
                {workoutSets.map((set, index) => (
                  <div
                    key={index}
                    className="bg-e5edff p-2 rounded-lg my-2 flex items-center justify-between"
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

export default WorkoutCard;
