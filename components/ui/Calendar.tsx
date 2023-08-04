import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FcCalendar } from "react-icons/fc";
import '@/datepicker.css';

interface CalendarProps {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

interface CustomInputProps {
  onClick?: () => void;
}

const CustomInput: React.FC<CustomInputProps> = ({ onClick }) => (
  <button onClick={onClick} className="calendar-icon flex flex-col items-center mt-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
    <FcCalendar size={34} />
  </button>
);

const Calendar: React.FC<CalendarProps> = ({ selectedDate, setSelectedDate }) => {
  return (
    <section>
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date) => setSelectedDate(date)}
        customInput={<CustomInput />}
        closeOnScroll={true}
      />
    </section>
  );
};

export default Calendar;
