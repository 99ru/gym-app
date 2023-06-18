import React from 'react'
import { Workout } from '../app/types' 

type Props = {
  workout: Workout
}

const WorkoutCard: React.FC<Props> = ({ workout }) => {
  return (
    <div className="border p-4 m-4 rounded">
      <h2 className="font-bold text-xl">{workout.name}</h2>
      <img src={workout.image} alt={workout.name} className="w-40 h-40 rounded-full" />
      <p>{workout.muscle}</p>
    </div>
  )
}

export default WorkoutCard
