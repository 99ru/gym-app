import React, { useState, forwardRef, ForwardedRef } from "react";
import DatePicker from "react-datepicker";
import { FcCalendar } from "react-icons/fc";
import "react-datepicker/dist/react-datepicker.css";

interface CalendarProps {
  onDateChange: (date: Date) => void;
}

type CustomInputProps = {
  value?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const CustomInput: React.FC<CustomInputProps> = forwardRef(
  (props: CustomInputProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const { value, onClick } = props;

    return (
      <button className="calendar-button" onClick={onClick} ref={ref}>
        <FcCalendar className="text-white h-14 w-14" />
      </button>
    );
  }
);

const Calendar: React.FC<CalendarProps> = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isOpen, setOpen] = useState(false);

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date) => {
        setSelectedDate(date);
        onDateChange(date);
      }}
      customInput={<CustomInput />}
      open={isOpen}
      onCalendarClose={() => setOpen(false)}
      onCalendarOpen={() => setOpen(true)}
    />
  );
};

export default Calendar;
