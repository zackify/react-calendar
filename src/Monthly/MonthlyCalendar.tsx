import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  format,
  subMonths,
  addMonths,
  getYear,
} from 'date-fns';
import React, { ReactNode, useContext } from 'react';

type CalendarState = {
  days: Date[];
  currentMonth: Date;
  onCurrentMonthChange: (date: Date) => any;
};

const MonthlyCalendarContext = React.createContext<CalendarState>(
  {} as CalendarState
);

export const useMonthlyCalendar = () => useContext(MonthlyCalendarContext);

type Props = {
  children: ReactNode;
  currentMonth: Date;
  onCurrentMonthChange: (date: Date) => any;
};

export const MonthlyCalendar = ({
  currentMonth,
  onCurrentMonthChange,
  children,
}: Props) => {
  let monthStart = startOfMonth(currentMonth);
  let days = eachDayOfInterval({
    start: monthStart,
    end: endOfMonth(monthStart),
  });

  return (
    <MonthlyCalendarContext.Provider
      value={{
        days,
        onCurrentMonthChange,
        currentMonth: monthStart,
      }}
    >
      {children}
    </MonthlyCalendarContext.Provider>
  );
};

export const MonthlyNav = () => {
  let { currentMonth, onCurrentMonthChange } = useMonthlyCalendar();

  return (
    <div className="flex justify-end mb-4">
      <button
        onClick={() => onCurrentMonthChange(subMonths(currentMonth, 1))}
        className="cursor-pointer"
      >
        Previous
      </button>
      <div className="ml-4 mr-4 w-32 text-center" aria-label="Current Month">
        {format(
          currentMonth,
          getYear(currentMonth) === getYear(new Date()) ? 'LLLL' : 'LLLL yyyy'
        )}
      </div>
      <button
        onClick={() => onCurrentMonthChange(addMonths(currentMonth, 1))}
        className="cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};
