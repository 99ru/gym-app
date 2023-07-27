"use client";
import React, { useContext, useState, useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/footer";
import WelcomeMsg from "@/components/WelcomeMsg";
import AddWorkout from "../components/AddWorkout";
import SelectMuscle from "../components/SelectMuscle";
import WorkoutCards from "../components/cards/WorkoutCards";
import LoginPage from "../app/login/page";
import workoutsData from "../utils/workouts.json";
import { AuthContext, AuthProvider } from "../auth/AuthProvider";

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
        <SelectMuscle
          workouts={workouts}
          setIsAddingWorkout={setIsAddingWorkout}
        />
      )}
      <div className="flex-grow">
        <WorkoutCards />
      </div>
      <Footer />
      {showWelcomeMsg && (
        <WelcomeMsg onClose={() => setShowWelcomeMsg(false)} />
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
