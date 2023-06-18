import React from 'react'
import { Workout } from '../utils/types' 
import Image from 'next/image'

type Props = {
  workout: Workout
}

const WorkoutCard: React.FC<Props> = ({ workout }) => {
  return (
    <div className="border p-4 m-4 rounded">
      <h2 className="font-bold text-xl">{workout.name}</h2>
      <Image src={workout.image} alt={workout.name} width={40} height={40} />
      <p>{workout.muscle}</p>
    </div>
  )
}

export default WorkoutCard
