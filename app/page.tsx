"use client";
import React, { useContext, useState, useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/footer";
import WelcomeDialog from "@/components/dialogs/WelcomeDialog";
import SelectWorkout from "@/components/SelectWorkout";
import WorkoutCards from "@/components/cards/WorkoutCards";
import Menu from "@/components/ui/Menu";
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
    <div className="flex flex-col min-h-screen"> 
      <Nav />
      {isAddingWorkout && (
        <SelectWorkout
          workouts={workouts}
          setIsAddingWorkout={setIsAddingWorkout}
          selectedDate={selectedDate}
        />
      )}
      <main className="flex-grow"> 
        <Menu
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setIsAddingWorkout={setIsAddingWorkout}
        />
        <WorkoutCards selectedDate={selectedDate} />
      </main>
      <Footer />
      {showWelcomeMsg && (
        <WelcomeDialog onClose={() => setShowWelcomeMsg(false)} />
      )}
    </div>
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
