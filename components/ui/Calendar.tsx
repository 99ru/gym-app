import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FcCalendar } from "react-icons/fc";

interface CalendarProps {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

interface CustomInputProps {
  onClick?: () => void;
}

const CustomInput: React.FC<CustomInputProps> = ({ onClick }) => (
  <button onClick={onClick} className="calendar-icon flex flex-col items-center justify-center">
    <FcCalendar size={40} />
    <p className="text-center text-black text-m sm:text-1xl mb-5 font-bold">Date</p>
  </button>
);

const Calendar: React.FC<CalendarProps> = ({ selectedDate, setSelectedDate }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date) => setSelectedDate(date)}
        customInput={<CustomInput />}
      />
    </div>
  );
};

export default Calendar;
