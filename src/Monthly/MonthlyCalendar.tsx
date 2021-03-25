import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  format,
  subMonths,
  addMonths,
  getYear,
  getDay,
  isSameDay,
} from 'date-fns';
import React, { ReactNode, useContext } from 'react';
import { daysInWeek } from '../shared';

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
type ExtraMonthData = { date: Date };

type MonthlyBodyProps<MonthData> = {
  /*
    skip days, an array of days, starts at sunday (0), saturday is 6
    ex: [0,6] would remove sunday and saturday from rendering
  */
  omitDays?: number[];
  events: (MonthData & ExtraMonthData)[];

  renderDay: (data: (MonthData & ExtraMonthData)[]) => ReactNode;
};

type OmittedDaysProps = {
  days: Date[];
  omitDays?: number[];
};

const handleOmittedDays = ({ days, omitDays }: OmittedDaysProps) => {
  let headings = daysInWeek;
  let daysToRender = days;

  //omit the headings and days of the week that were passed in
  if (omitDays) {
    headings = daysInWeek.filter(day => !omitDays.includes(day.day));
    daysToRender = days.filter(day => !omitDays.includes(getDay(day)));
  }

  // omit the padding if an omitted day was before the start of the month
  let firstDayOfMonth = getDay(daysToRender[0]) as number;
  if (omitDays) {
    let subtractOmittedDays = omitDays.filter(day => day < firstDayOfMonth)
      .length;
    firstDayOfMonth = firstDayOfMonth - subtractOmittedDays;
  }
  let padding = new Array(firstDayOfMonth).fill(0);

  return { headings, daysToRender, padding };
};

//to prevent these from being purged in production, we make a lookup object
const headingClasses = {
  l3: 'lg:grid-cols-3',
  l4: 'lg:grid-cols-4',
  l5: 'lg:grid-cols-5',
  l6: 'lg:grid-cols-6',
  l7: 'lg:grid-cols-7',
};

export function MonthlyBody<MonthData>({
  omitDays,
  events,
  renderDay,
}: MonthlyBodyProps<MonthData>) {
  let { days } = useMonthlyCalendar();
  let { headings, daysToRender, padding } = handleOmittedDays({
    days,
    omitDays,
  });

  let headingClassName = 'border-b-2 p-2 border-r-2 lg:block hidden';
  return (
    <div className="bg-white border-l-2 border-t-2">
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 ${
          //@ts-ignore
          headingClasses[`l${headings.length}`]
        }`}
      >
        {headings.map(day => (
          <div
            key={day.day}
            className={headingClassName}
            aria-label="Day of Week"
          >
            {day.label}
          </div>
        ))}
        {padding.map((_, index) => (
          <div
            key={index}
            className={headingClassName}
            aria-label="Empty Day"
          />
        ))}
        {daysToRender.map(day => {
          let dayData = events.filter(data => isSameDay(data.date, day));
          let dayNumber = format(day, 'd');
          return (
            <div
              key={day.toISOString()}
              aria-label={`Events for day ${dayNumber}`}
              className="h-48 p-2 border-b-2 border-r-2"
            >
              <div className="flex justify-between">
                <div className="font-bold">{dayNumber}</div>
                <div className="lg:hidden block">{format(day, 'EEEE')}</div>
              </div>
              <ul className="divide-gray-200 divide-y overflow-hidden max-h-36 overflow-y-auto">
                {renderDay(dayData)}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
