import React, { ReactNode, useContext } from 'react';
import { useMonthlyCalendar } from './MonthlyCalendar';
import { daysInWeek } from '../shared';
import { format, getDay, isSameDay, Locale } from 'date-fns';

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
  locale?: Locale;
};

export const handleOmittedDays = ({
  days,
  omitDays,
  locale,
}: OmittedDaysProps) => {
  let headings = daysInWeek({ locale });
  let daysToRender = days;

  //omit the headings and days of the week that were passed in
  if (omitDays) {
    headings = daysInWeek({ locale }).filter(
      day => !omitDays.includes(day.day)
    );
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
  l3: 'lg:rc-grid-cols-3',
  l4: 'lg:rc-grid-cols-4',
  l5: 'lg:rc-grid-cols-5',
  l6: 'lg:rc-grid-cols-6',
  l7: 'lg:rc-grid-cols-7',
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
  let { days, locale } = useMonthlyCalendar();
  let { headings, daysToRender, padding } = handleOmittedDays({
    days,
    omitDays,
    locale,
  });

  let headingClassName =
    'rc-border-b-2 rc-p-2 rc-border-r-2 lg:rc-block rc-hidden';
  return (
    <div className="rc-bg-white rc-border-l-2 rc-border-t-2">
      <div
        className={`rc-grid rc-grid-cols-1 sm:rc-grid-cols-2 md:rc-grid-cols-4 ${
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
  let { locale } = useMonthlyCalendar();
  let { day, events } = useMonthlyBody<DayData>();
  let dayNumber = format(day, 'd', { locale });

  return (
    <div
      aria-label={`Events for day ${dayNumber}`}
      className="rc-h-48 rc-p-2 rc-border-b-2 rc-border-r-2"
    >
      <div className="rc-flex rc-justify-between">
        <div className="rc-font-bold">{dayNumber}</div>
        <div className="lg:rc-hidden rc-block">
          {format(day, 'EEEE', { locale })}
        </div>
      </div>
      <ul className="rc-divide-gray-200 rc-divide-y rc-overflow-hidden rc-max-h-36 rc-overflow-y-auto">
        {renderDay(events)}
      </ul>
    </div>
  );
}
