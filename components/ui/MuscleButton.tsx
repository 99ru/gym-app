import { MuscleGroups } from './SelectMuscleGroup';

type MuscleButtonProps = {
  muscle: MuscleGroups;
  selectedMuscle: MuscleGroups | null;
  onClick: (muscle: MuscleGroups) => void;
};

const MuscleButton: React.FC<MuscleButtonProps> = ({
  muscle,
  selectedMuscle,
  onClick,
}) => (
  <button
    onClick={() => onClick(muscle)}
    className={`bg-dark  text-white font-bold py-2 px-4 rounded m-2 min-w-[120px] text-center ${
      selectedMuscle === muscle ? "bg-dark" : ""
    }`}
  >
    {muscle}
  </button>
);

export default MuscleButton;
