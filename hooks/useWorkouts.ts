import { useEffect, useState } from "react";
import { Workout } from "@/utils/types";
import { db } from "@/utils/firebase";
import { doc, addDoc, collection, onSnapshot, deleteDoc } from "firebase/firestore";
import { useAuth } from "@/auth/AuthProvider";

const useWorkouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const workoutsCollection = collection(db, `users/${currentUser.uid}/workouts`);
      const unsubscribe = onSnapshot(workoutsCollection, (snapshot) => {
        const workouts = snapshot.docs.map((doc) => ({
          docId: doc.id,
          ...doc.data(),
        }));
        setWorkouts(workouts as Workout[]);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [currentUser]);

  const deleteWorkout = async (docId: string) => {
    const docRef = doc(db, `users/${currentUser?.uid}/workouts`, docId);
    await deleteDoc(docRef);
    setWorkouts((prevWorkouts) => prevWorkouts.filter((workout) => workout.docId !== docId));
  };

  const saveWorkout = async (workout: Workout) => {
    const docRef = collection(db, `users/${currentUser?.uid}/workouts`);
    await addDoc(docRef, workout);
  };

  return { workouts, deleteWorkout, saveWorkout };
};

export default useWorkouts;
