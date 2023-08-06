import { useState, useEffect } from "react";
import { Workout, WorkoutSet as WorkoutSetType } from "@/utils/types";
import { db } from "@/utils/firebase";
import { doc, addDoc, collection, onSnapshot, updateDoc, deleteDoc } from "firebase/firestore";
import { useAuth } from "@/auth/AuthProvider";

const useWorkouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [workoutSets, setWorkoutSets] = useState<WorkoutSetType[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const workoutsCollection = collection(db, `users/${currentUser.uid}/workouts`);
      const unsubscribe = onSnapshot(workoutsCollection, (snapshot) => {
        const fetchedWorkouts = snapshot.docs.map((doc) => ({
          docId: doc.id,
          ...doc.data(),
        }));
        setWorkouts(fetchedWorkouts as Workout[]);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  const loadWorkoutSets = (docId: string) => {
    if (currentUser) {
      const workoutRef = doc(db, `users/${currentUser.uid}/workouts/${docId}`);
      const unsubscribe = onSnapshot(workoutRef, (docSnapshot) => {
        const data = docSnapshot.data();
        setWorkoutSets(data?.sets || []);
      });

      return unsubscribe; // This allows for cleanup on component unmount
    }
  };

  const addSet = async (docId: string, newSet: WorkoutSetType) => {
    if (!currentUser) throw new Error("No authenticated user");

    // Update local state
    setWorkoutSets(prevSets => [...prevSets, newSet]);

    // Update Firestore
    const workoutRef = doc(db, `users/${currentUser.uid}/workouts/${docId}`);
    await updateDoc(workoutRef, {
      sets: [...workoutSets, newSet],
    });
  };

const updateSet = async (docId: string, index: number, updatedSet: WorkoutSetType) => {
    if (!currentUser) throw new Error("No authenticated user");

    const updatedWorkoutSets = [...workoutSets];
    updatedWorkoutSets[index] = updatedSet;
    setWorkoutSets(updatedWorkoutSets);

    const workoutRef = doc(db, `users/${currentUser.uid}/workouts/${docId}`);
    await updateDoc(workoutRef, {
      sets: updatedWorkoutSets,
    });
};

  const deleteSet = async (docId: string, setId: number) => {
    if (!currentUser) throw new Error("No authenticated user");

    const updatedWorkoutSets = workoutSets.filter((_, idx) => idx !== setId);
    setWorkoutSets(updatedWorkoutSets);

    const workoutRef = doc(db, `users/${currentUser.uid}/workouts/${docId}`);
    await updateDoc(workoutRef, {
      sets: updatedWorkoutSets,
    });
  };

  const deleteWorkout = async (docId: string) => {
    if (!currentUser) throw new Error("No authenticated user");

    const docRef = doc(db, `users/${currentUser.uid}/workouts`, docId);
    await deleteDoc(docRef);
    setWorkouts(prevWorkouts => prevWorkouts.filter(workout => workout.docId !== docId));
  };

  const saveWorkout = async (workout: Workout) => {
    if (!currentUser) throw new Error("No authenticated user");

    const docRef = collection(db, `users/${currentUser.uid}/workouts`);
    await addDoc(docRef, workout);
  };

  return { workouts, workoutSets, loadWorkoutSets, addSet, updateSet, deleteSet, deleteWorkout, saveWorkout };
};

export default useWorkouts;
