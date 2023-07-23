'use client'
import React, { useContext, useState } from "react";
import Nav from "@/components/Nav";
import AddWorkout from "../components/AddWorkout";
import SelectMuscle from "../components/SelectMuscle";
import LoginPage from "../app/login/page";
import workoutsData from "../utils/workouts.json";
import WorkoutCards  from "../components/cards/WorkoutCards";
import { AuthContext, AuthProvider } from "../auth/AuthProvider";

const Home: React.FC = () => {
  const { currentUser, loading } = useContext(AuthContext);
  const workouts = workoutsData.workouts; 
  const [isAddingWorkout, setIsAddingWorkout] = useState(false);

  if (loading) {
    return <div>Loading...</div>; 
  }
  
  if (!currentUser) {
    return <LoginPage />;
  }

  return (
    <>
      <Nav />
      {!isAddingWorkout && (
        <AddWorkout
          setIsAddingWorkout={setIsAddingWorkout}
        />
      )}
      {isAddingWorkout && (
        <SelectMuscle
          workouts={workouts}
          setIsAddingWorkout={setIsAddingWorkout}
        />
      )}
     <WorkoutCards  />
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
};

export default App;
