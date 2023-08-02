"use client";
import React, { useContext, useState, useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/footer";
import WelcomeDialog from "@/components/dialogs/WelcomeDialog";
import AddWorkout from "@/components/addworkout/AddNew";
import SelectWorkout from "@/components/addworkout/SelectWorkout";
import WorkoutCards from "../components/cards/WorkoutCards";
import LoginPage from "../app/login/page";
import workoutsData from "../utils/workouts.json";
import { AuthContext, AuthProvider } from "../auth/AuthProvider";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Home: React.FC = () => {
  const { currentUser, loading } = useContext(AuthContext);
  const workouts = workoutsData.workouts;
  const [showWelcomeMsg, setShowWelcomeMsg] = useState(false);
  const [isAddingWorkout, setIsAddingWorkout] = useState(false);

  useEffect(() => {
    const isFirstLogin = localStorage.getItem("firstLogin") === null;
    if (isFirstLogin && currentUser) {
      localStorage.setItem("firstLogin", "false");
      setShowWelcomeMsg(true);
    }
  }, [currentUser]);

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
        <AddWorkout setIsAddingWorkout={setIsAddingWorkout} />
      )}
      {isAddingWorkout && (
        <SelectWorkout
          workouts={workouts} 
          setIsAddingWorkout={setIsAddingWorkout}
        />
      )}
      <div className="flex-grow">

      <WorkoutCards />

      </div>
      <Footer />
      {showWelcomeMsg && (
        <WelcomeDialog onClose={() => setShowWelcomeMsg(false)} />
      )}
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
