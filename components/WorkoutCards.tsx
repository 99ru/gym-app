import React, { useEffect, useState } from "react";
import {
  Workout as WorkoutType,
  WorkoutSet as WorkoutSetType,
} from "../utils/types";
import { db } from "../utils/firebase";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import SingleWorkoutCard from "./SingleWorkoutCard";
import { useAuth } from "../auth/AuthProvider";

const WorkoutCards: React.FC = () => {
  const [savedWorkouts, setSavedWorkouts] = useState<WorkoutType[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const workoutsCollection = collection(
        db,
        `users/${currentUser.uid}/workouts`
      );

      const unsubscribe = onSnapshot(workoutsCollection, (snapshot) => {
        const workouts = snapshot.docs.map((doc) => ({
          docId: doc.id,
          ...doc.data(),
        }));
        setSavedWorkouts(workouts as WorkoutType[]);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [currentUser]);

  const handleDeleteWorkout  = async (docId: string) => {
    const docRef = doc(db, `users/${currentUser?.uid}/workouts`, docId);
    await deleteDoc(docRef);

    setSavedWorkouts(
      savedWorkouts.filter((workout) => workout.docId !== docId)
    );
  };

  return (
    <div className="flex flex-col items-center">      {savedWorkouts.map((workout) => (
        <SingleWorkoutCard
          key={workout.id}
          workout={workout}
          onDelete ={handleDeleteWorkout }
        />
      ))}
    </div>
  );
};

export default WorkoutCards;
