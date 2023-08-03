import React from "react";
import AddWorkout from "@/components/ui/AddWorkout";
import Calendar from "@/components/ui/Calendar";

interface MenuProps {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  setIsAddingWorkout: (show: boolean) => void;
}

const Menu: React.FC<MenuProps> = ({
  selectedDate,
  setSelectedDate,
  setIsAddingWorkout,
}) => {
  return (
    <div className="flex justify-center mt-4">
      <div className="flex items-center gap-4 border-gray-300">
        <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <AddWorkout setIsAddingWorkout={setIsAddingWorkout} />
      </div>
    </div>
  );
};

export default Menu;
