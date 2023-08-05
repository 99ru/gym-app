import React from 'react';
import { WorkoutSet as WorkoutSetType } from '../../utils/types';

type Props = {
  set: WorkoutSetType;
  index: number;
};

const WorkoutSet: React.FC<Props> = ({ set, index,  }) => (
  <div
    className="border-b text-drk p-2 rounded-lg my-2 flex items-center justify-between space-x-2"
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
  </div>
);

export default WorkoutSet;
