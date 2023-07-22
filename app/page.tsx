'use client'
import React, { useContext, useState } from "react";
import Nav from "@/components/Nav";
import AddWorkout from "../components/AddWorkout";
import SelectMuscle from "../components/SelectMuscle";
import LoginPage from "../app/login/page";
import workoutsData from "../utils/workouts.json";
import WorkoutCards  from "../components/WorkoutCards";

import { AuthContext, AuthProvider } from "../auth/AuthProvider";


const Home: React.FC = () => {
  const { currentUser, loading } = useContext(AuthContext);
  const workouts = workoutsData.workouts; 
  const [showWorkout, setShowWorkout] = useState(false);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!currentUser) {
    return <LoginPage />;
  }

  return (
    <>
      <Nav />
      
      {!showWorkout && (
        <AddWorkout
          setShowWorkout={setShowWorkout}
        />
      )}
      {showWorkout && (
        <SelectMuscle
          workouts={workouts}
          setShowWorkout={setShowWorkout}
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
