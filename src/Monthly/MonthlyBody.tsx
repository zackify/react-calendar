import React, { ReactNode, useContext } from 'react';
import { useMonthlyCalendar } from './MonthlyCalendar';
import { daysInWeek } from '../shared';
import { format, getDay, isSameDay } from 'date-fns';

const MonthlyBodyContext = React.createContext({} as any);
type BodyState<DayData> = {
  day: Date;
  events: DayData[];
};

export function useMonthlyBody<DayData>() {
  return useContext<BodyState<DayData>>(MonthlyBodyContext);
}

type OmittedDaysProps = {
  days: Date[];
  omitDays?: number[];
};

export const handleOmittedDays = ({ days, omitDays }: OmittedDaysProps) => {
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

type MonthlyBodyProps<DayData> = {
  /*
    skip days, an array of days, starts at sunday (0), saturday is 6
    ex: [0,6] would remove sunday and saturday from rendering
  */
  omitDays?: number[];
  events: (DayData & { date: Date })[];
  children: ReactNode;
};

export function MonthlyBody<DayData>({
  omitDays,
  events,
  children,
}: MonthlyBodyProps<DayData>) {
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
        {daysToRender.map(day => (
          <MonthlyBodyContext.Provider
            key={day.toISOString()}
            value={{
              day,
              events: events.filter(data => isSameDay(data.date, day)),
            }}
          >
            {children}
          </MonthlyBodyContext.Provider>
        ))}
      </div>
    </div>
  );
}

type MonthlyDayProps<DayData> = {
  renderDay: (events: DayData[]) => ReactNode;
};
export function MonthlyDay<DayData>({ renderDay }: MonthlyDayProps<DayData>) {
  let { day, events } = useMonthlyBody<DayData>();
  let dayNumber = format(day, 'd');

  return (
    <div
      aria-label={`Events for day ${dayNumber}`}
      className="h-48 p-2 border-b-2 border-r-2"
    >
      <div className="flex justify-between">
        <div className="font-bold">{dayNumber}</div>
        <div className="lg:hidden block">{format(day, 'EEEE')}</div>
      </div>
      <ul className="divide-gray-200 divide-y overflow-hidden max-h-36 overflow-y-auto">
        {renderDay(events)}
      </ul>
    </div>
  );
}
