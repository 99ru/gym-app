export type Workout = {
  id: number;
  name: string;
  image: string;
  muscle: string;
  date?: string;
  docId?: string; 
};

export type WorkoutSet = {
  reps: number;
  weight: number;
};