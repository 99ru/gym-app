'use client'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import AddWorkout from '../components/AddWorkout'
import FilteredWorkouts from '../components/FilteredWorkouts'
import { Workout } from '../utils/types'

const fetcher = (url: string) => fetch(url).then(res => res.json())

const Home: React.FC = () => {
  const { data, error } = useSWR<{ workouts: Workout[] }>(
    'https://run.mocky.io/v3/0a8a7068-2165-4c9a-96aa-6992b4148a52',
    fetcher
  )
  const [showWorkout, setShowWorkout] = useState(false)
  const [selectedWorkouts, setSelectedWorkouts] = useState<Workout[]>([])

  // Load selected workouts from local storage on component mount
  useEffect(() => {
    const savedWorkouts = localStorage.getItem('selectedWorkouts')
    if (savedWorkouts) {
      setSelectedWorkouts(JSON.parse(savedWorkouts))
    }
  }, [])

  // Save selected workouts to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedWorkouts', JSON.stringify(selectedWorkouts))
  }, [selectedWorkouts])

  if (error) return <div>Failed to load workouts</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      {!showWorkout && <AddWorkout showWorkout={showWorkout} setShowWorkout={setShowWorkout} selectedWorkouts={selectedWorkouts} />}
      {showWorkout && <FilteredWorkouts workouts={data.workouts} setSelectedWorkouts={setSelectedWorkouts} setShowWorkout={setShowWorkout} />}
    </>
  )
}

export default Home
