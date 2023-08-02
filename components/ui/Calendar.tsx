import React, { useState, forwardRef, ForwardedRef } from "react";
import DatePicker from "react-datepicker";
import { FcCalendar } from "react-icons/fc";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from 'dayjs';

interface CalendarProps {
  onDateChange: (date: string) => void; // Change Date to string
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
        const formattedDate = dayjs(date).format('YYYY-MM-DD');
        /* console.log(formattedDate); */
        onDateChange(formattedDate);
      }}
      customInput={<CustomInput />}
      open={isOpen}
      onCalendarClose={() => setOpen(false)}
      onCalendarOpen={() => setOpen(true)}
    />
  );
};

export default Calendar;
