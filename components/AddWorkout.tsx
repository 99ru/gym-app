import React from 'react'
import { IoAddCircle } from 'react-icons/io5'
import WorkoutCard from '../components/WorkoutCard'
import { Workout } from '../utils/types' 

type Props = {
  showWorkout: boolean
  setShowWorkout: (show: boolean) => void
  selectedWorkouts: Workout[]
}

const AddWorkout: React.FC<Props> = ({ showWorkout, setShowWorkout, selectedWorkouts }) => {
  return (
    <div className="flex flex-col items-center h-screen p-20">
      <IoAddCircle
        className="text-6xl text-black cursor-pointer"
        onClick={() => setShowWorkout(true)}
      />
      <h1 className="text-center">Add Workout</h1>
      <div className="add-msg">
        <h1>Click on the 'Add Workout' to get started</h1>
      </div>
      {selectedWorkouts.map(workout => <WorkoutCard key={workout.id} workout={workout} />)}
    </div>
  )
}

export default AddWorkout;