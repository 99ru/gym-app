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

const Home: React.FC = () => {
  const { currentUser, loading } = useContext(AuthContext);
  const workouts = workoutsData.workouts;
  const [showWelcomeMsg, setShowWelcomeMsg] = useState(false);
  const [isAddingWorkout, setIsAddingWorkout] = useState(false);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // date picker

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
      <Nav selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      {!isAddingWorkout && (
        <AddWorkout setIsAddingWorkout={setIsAddingWorkout} />
      )}
      {isAddingWorkout && (
        <SelectWorkout
          workouts={workouts}
          setIsAddingWorkout={setIsAddingWorkout}
          selectedDate={selectedDate}
        />
      )}
      
      <main className="flex-grow">
        <WorkoutCards selectedDate={selectedDate} />
      </main>

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
