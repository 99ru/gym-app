import { useEffect, useState } from "react";
import useSWR from "swr";
import { Workout } from "./types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useWorkouts() {
  const { data, error } = useSWR<{ workouts: Workout[] }>(
    "https://run.mocky.io/v3/0a8a7068-2165-4c9a-96aa-6992b4148a52",
    fetcher
  );
  const [selectedWorkouts, setSelectedWorkouts] = useState<Workout[]>([]);

  const onDelete = (id: number) => {
    setSelectedWorkouts(prevWorkouts =>
      prevWorkouts.filter(workout => workout.id !== id)
    );
  };

  useEffect(() => {
    const savedWorkouts = localStorage.getItem("selectedWorkouts");
    if (savedWorkouts) {
      setSelectedWorkouts(JSON.parse(savedWorkouts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedWorkouts", JSON.stringify(selectedWorkouts));
  }, [selectedWorkouts]);

  return {
    data,
    error,
    selectedWorkouts,
    setSelectedWorkouts,
    onDelete,
  };
}
