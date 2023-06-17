import { createContext, useState, useEffect, useContext } from "react";

const WorkoutContext = createContext<any[]>([]);

export const WorkoutProvider = ({ children }: any) => {
  const [workouts, setWorkouts] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://run.mocky.io/v3/0a8a7068-2165-4c9a-96aa-6992b4148a52")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.workouts)) {
          setWorkouts(data.workouts);
        } else {
          console.error("Invalid data format:", data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <WorkoutContext.Provider value={workouts}>{children}</WorkoutContext.Provider>
  );
};

export const useWorkouts = () => useContext(WorkoutContext);
