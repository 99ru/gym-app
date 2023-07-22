export type Workout = {
  id: number;
  name: string;
  image: string;
  muscle: string;
  docId?: string; 
};

export type WorkoutSet = {
  reps: number;
  weight: number;
};