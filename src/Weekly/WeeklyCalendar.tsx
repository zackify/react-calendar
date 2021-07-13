import {
  startOfWeek,
  format,
  isSameDay,
  getDay,
  setDay,
  isSameWeek,
} from 'date-fns';
import React, {
  CSSProperties,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { daysInWeek } from '../shared';

type State = {
  week: Date;
  selectedDay?: Date;
  locale?: Locale;
  changeSelectedDay: (day?: Date) => any;
};

const WeeklyContext = React.createContext<State>({} as State);
export const useWeeklyCalendar = () => useContext(WeeklyContext);

type WeeklyCalendarProps = {
  week: Date;
  children: ReactNode;
  locale?: Locale;
};

export const WeeklyCalendar = ({
  locale,
  week,
  children,
}: WeeklyCalendarProps) => {
  let [selectedDay, setSelectedDay] = useState<Date>();

  //clear the selected day if the week changes
  useEffect(() => {
    setSelectedDay(undefined);
  }, [week]);

  return (
    <WeeklyContext.Provider
      value={{
        locale,
        selectedDay,
        week: startOfWeek(week),
        changeSelectedDay: setSelectedDay,
      }}
    >
      {children}
    </WeeklyContext.Provider>
  );
};

type WeeklyContainerProps = {
  children: ReactNode;
};
export const WeeklyContainer = ({ children }: WeeklyContainerProps) => {
  return <div className="md:rc-flex md:rc-justify-between">{children}</div>;
};

type DayButtonProps = {
  day: { day: number; label: string };
};

const DayButton = ({ day }: DayButtonProps) => {
  let { locale, week, selectedDay, changeSelectedDay } = useWeeklyCalendar();
  let isSelected = selectedDay ? getDay(selectedDay) === day.day : false;
  let currentDate = setDay(week, day.day, { locale });
  return (
    <li
      onClick={() => changeSelectedDay(isSelected ? undefined : currentDate)}
      className="rc-bg-white rc-cursor-pointer"
      aria-label="Day of Week"
    >
      <div
        className={`rc-rounded-lg rc-border sm:rc-w-36 rc-text-center rc-py-4 ${
          isSelected
            ? 'rc-border-indigo-600'
            : 'rc-border-gray-300 hover:rc-border-gray-500'
        }`}
      >
        <p className="rc-font-medium rc-text-sm rc-text-gray-800">
          {day.label} {format(currentDate, 'do', { locale })}
        </p>
      </div>
    </li>
  );
};

type WeeklyDaysProps = {
  omitDays?: number[];
};

export const WeeklyDays = ({ omitDays }: WeeklyDaysProps) => {
  let { locale } = useWeeklyCalendar();
  let daysToRender = daysInWeek({ locale });

  if (omitDays) {
    daysToRender = daysInWeek({ locale }).filter(
      day => !omitDays.includes(day.day)
    );
  }
  return (
    <ul className="rc-grid md:rc-grid-cols-1 rc-grid-cols-2 rc-gap-2">
      {daysToRender.map(day => (
        <DayButton key={day.day} day={day} />
      ))}
    </ul>
  );
};

type RenderItemProps<EventItem> = {
  item: EventItem & { date: Date };
  /*
    boolean indicating if a full week is being shwown
    vs having a single day selected
  */
  showingFullWeek: boolean;
};

type WeeklyBodyProps<EventItem> = {
  style?: CSSProperties;
  events: (EventItem & { date: Date })[];
  renderItem: (item: RenderItemProps<EventItem>) => ReactNode;
};

export function WeeklyBody<EventItem>({
  events,
  renderItem,
  style,
}: WeeklyBodyProps<EventItem>) {
  let { week, selectedDay } = useWeeklyCalendar();
  return (
    <div className="rc-overflow-auto rc-max-h-96" style={style}>
      <ul className="rc-divide-y rc-divide-gray-200 ">
        {events.map(item => {
          // If they select a single day, filter out events for different days
          if (selectedDay) {
            if (!isSameDay(selectedDay, item.date)) return null;
          }
          //if an event is for a different week, filter it out
          if (!isSameWeek(week, item.date)) return null;

          //return the remeaining events!
          return renderItem({
            item,
            showingFullWeek: selectedDay === undefined,
          });
        })}
      </ul>
    </div>
  );
}

export const WeeklyResponsiveContainer = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="rc-border rc-p-4 md:rc-w-3/4 lg:rc-w-1/2 rc-w-full">
      {children}
    </div>
  );
};
