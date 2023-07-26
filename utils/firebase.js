import { initializeApp } from 'firebase/app';
import { getFirestore, doc, onSnapshot, updateDoc, collection, setDoc  } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInAnonymously } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};
export const signInAsGuest = () => {
  return signInAnonymously(auth);
};

export const logout = () => auth.signOut();

// Function to save workout details to Firestore
export async function saveWorkout(workoutData) {
  try {
    const workoutsCollection = collection(db, 'workouts');

    // Generate a new document ID
    const docRef = doc(workoutsCollection);

    // Set the workout data to the generated document ID
    await setDoc(docRef, workoutData);

    console.log('Workout saved successfully!');
  } catch (error) {
    console.error('Error saving workout:', error);
  }
}

export { app, db, auth, doc, onSnapshot, updateDoc };
