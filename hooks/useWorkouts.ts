
import { useEffect, useState } from "react";
import { Workout } from "@/utils/types";
import { db } from "@/utils/firebase";
import { doc, collection, onSnapshot, deleteDoc } from "firebase/firestore";
import { useAuth } from "@/auth/AuthProvider";

const useWorkouts = () => {
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
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
        setSavedWorkouts(workouts as Workout[]);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [currentUser]);

  const handleDeleteWorkout = async (docId: string) => {
    const docRef = doc(db, `users/${currentUser?.uid}/workouts`, docId);
    await deleteDoc(docRef);

    setSavedWorkouts((prevWorkouts) =>
      prevWorkouts.filter((workout) => workout.docId !== docId)
    );
  };

  return { savedWorkouts, handleDeleteWorkout };
};

export default useWorkouts;
