'use client'

import { FC, useState } from 'react'
import useSWR from 'swr'
import AddWorkout from '../components/AddWorkout'
import FilteredWorkouts from '../components/FilteredWorkouts'
import { Workout } from './types' // Importing the Workout type from types.ts

const fetcher = (url: string) => fetch(url).then(res => res.json())

const Home: FC = () => {
  const { data, error } = useSWR<{ workouts: Workout[] }>(
    'https://run.mocky.io/v3/0a8a7068-2165-4c9a-96aa-6992b4148a52',
    fetcher
  )
  const [showWorkout, setShowWorkout] = useState(false)

  if (error) return <div>Failed to load workouts</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      {!showWorkout && <AddWorkout showWorkout={showWorkout} setShowWorkout={setShowWorkout} />}
      {showWorkout && <FilteredWorkouts workouts={data.workouts} />}
    </>
  )
}

export default Home
