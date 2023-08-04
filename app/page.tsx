"use client";
import React, { useContext, useState, useEffect } from "react";
import Nav from "@/components/common/Nav";
import Footer from "@/components/common/footer";
import WelcomeDialog from "@/components/dialogs/WelcomeDialog";
import SelectMuscleGroup from "@/components/ui/SelectMuscleGroup";
import WorkoutCards from "@/components/cards/WorkoutCards";

import LoginPage from "../app/login/page";
import workoutsData from "../utils/workouts.json";
import { AuthContext, AuthProvider } from "../auth/AuthProvider";

const Home: React.FC = () => {
  const { currentUser, loading } = useContext(AuthContext);
  const workouts = workoutsData.workouts;
  const [showWelcomeMsg, setShowWelcomeMsg] = useState(false);
  const [isAddingWorkout, setIsAddingWorkout] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

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
    <main className="flex flex-col min-h-screen relative">
      <Nav
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setIsAddingWorkout={setIsAddingWorkout}
      />
      {isAddingWorkout && (
        <SelectMuscleGroup
          workouts={workouts}
          setIsAddingWorkout={setIsAddingWorkout}
          selectedDate={selectedDate}
        />
      )}
      <WorkoutCards selectedDate={selectedDate} />
      <Footer />
      {showWelcomeMsg && (
        <WelcomeDialog onClose={() => setShowWelcomeMsg(false)} />
      )}
    </main>
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
