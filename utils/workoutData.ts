'use client'
import { useEffect, useState, useContext } from "react";
import { Workout } from "./types";
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";
import { AuthContext } from "@/auth/AuthProvider";

export default function dataWorkouts() {
  const { currentUser } = useContext(AuthContext);
  const [selectedWorkouts, setSelectedWorkouts] = useState<Workout[]>([]);

  // delete a workout document from Firestore
  const onDelete = async (docId: string) => {
    try {
      const userId = currentUser?.uid;
      if (userId) {
        const userWorkoutsRef = collection(db, "users", userId, "workouts");
        await deleteDoc(doc(userWorkoutsRef, docId));
      }
    } catch (error) {
      console.error("Error deleting workout: ", error);
    }
  };

  // Fetch and set workouts for the current user from Firestore
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const userId = currentUser?.uid;
        if (userId) {
          const userWorkoutsRef = collection(db, "users", userId, "workouts");
          const querySnapshot = await getDocs(userWorkoutsRef);

          const workouts: Workout[] = [];
          querySnapshot.forEach((doc) => {
            const workoutData = {
              ...doc.data(),
              docId: doc.id,
            } as Workout;
            workouts.push(workoutData);
          });

          setSelectedWorkouts(workouts);
        }
      } catch (error) {
        console.error("Error fetching workouts: ", error);
      }
    };

    if (currentUser) {
      fetchWorkouts();
    }
  }, [currentUser]);

  // this will update the workouts in real time
  useEffect(() => {
    const userId = currentUser?.uid;
    if (userId) {
      const userWorkoutsRef = collection(db, "users", userId, "workouts");

      const unsubscribe = onSnapshot(userWorkoutsRef, (snapshot) => {
        const workouts: Workout[] = [];
        snapshot.forEach((doc) => {
          const workoutData = {
            ...doc.data(),
            docId: doc.id, 
          } as Workout;
          workouts.push(workoutData);
        });

        setSelectedWorkouts(workouts);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  // save a workout document to Firestore
  const saveWorkout = async (workout: Workout) => {
    try {
      const userId = currentUser?.uid;
      if (userId) {
        const userWorkoutsRef = collection(db, "users", userId, "workouts");

        const cardData = {
          id: workout.id,
          name: workout.name,
          image: workout.image,
          muscle: workout.muscle,
        };

        await addDoc(userWorkoutsRef, cardData);
      }
    } catch (error) {
      console.error("Error saving card: ", error);
    }
  };

  return {
    selectedWorkouts,
    setSelectedWorkouts,
    onDelete,
    saveWorkout,
  };
}
