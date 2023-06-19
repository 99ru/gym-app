"use client";
import { useEffect, useState } from "react";
import useSWR from "swr";
import AddWorkout from "../components/AddWorkout";
import SelectMuscle from "../components/SelectMuscle";
import { Workout } from "../utils/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home: React.FC = () => {
  const { data, error } = useSWR<{ workouts: Workout[] }>(
    "https://run.mocky.io/v3/0a8a7068-2165-4c9a-96aa-6992b4148a52",
    fetcher
  );
  const [showWorkout, setShowWorkout] = useState(false);
  const [selectedWorkouts, setSelectedWorkouts] = useState<Workout[]>([]);
 const onDelete = (id: number) => {
  setSelectedWorkouts(prevWorkouts => prevWorkouts.filter(workout => workout.id !== id));
}

  useEffect(() => {
    const savedWorkouts = localStorage.getItem("selectedWorkouts");
    if (savedWorkouts) {
      setSelectedWorkouts(JSON.parse(savedWorkouts));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("selectedWorkouts", JSON.stringify(selectedWorkouts));
  }, [selectedWorkouts]);

  if (error) return <div>Failed to load workouts</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      {!showWorkout && (
        <AddWorkout
          showWorkout={showWorkout}
          setShowWorkout={setShowWorkout}
          selectedWorkouts={selectedWorkouts}
          onDelete={onDelete}
        />
      )}
      {showWorkout && (
        <SelectMuscle
          workouts={data.workouts}
          setSelectedWorkouts={setSelectedWorkouts}
          setShowWorkout={setShowWorkout}
        />
      )}
    </>
  );
};

export default Home;
