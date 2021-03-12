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
  changeSelectedDay: (day?: Date) => any;
};

const WeeklyContext = React.createContext<State>({} as State);
export const useWeeklyCalendar = () => useContext(WeeklyContext);

type WeeklyCalendarProps = {
  week: Date;
  children: ReactNode;
};

export const WeeklyCalendar = ({ week, children }: WeeklyCalendarProps) => {
  let [selectedDay, setSelectedDay] = useState<Date>();

  //clear the selected day if the week changes
  useEffect(() => {
    setSelectedDay(undefined);
  }, [week]);

  return (
    <WeeklyContext.Provider
      value={{
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
  return <div className="md:flex md:justify-between">{children}</div>;
};

type DayButtonProps = {
  day: { day: number; label: string };
};

const DayButton = ({ day }: DayButtonProps) => {
  let { week, selectedDay, changeSelectedDay } = useWeeklyCalendar();
  let isSelected = selectedDay ? getDay(selectedDay) === day.day : false;
  let currentDate = setDay(week, day.day);
  return (
    <li
      onClick={() => changeSelectedDay(isSelected ? undefined : currentDate)}
      className="bg-white cursor-pointer"
      aria-label="Day of Week"
    >
      <div
        className={`rounded-lg border sm:w-36 text-center py-4 ${
          isSelected
            ? 'border-indigo-600'
            : 'border-gray-300 hover:border-gray-500'
        }`}
      >
        <p className="font-medium text-sm text-gray-800">
          {day.label} {format(currentDate, 'do')}
        </p>
      </div>
    </li>
  );
};

type WeeklyDaysProps = {
  omitDays?: number[];
};

export const WeeklyDays = ({ omitDays }: WeeklyDaysProps) => {
  let daysToRender = daysInWeek;

  if (omitDays) {
    daysToRender = daysInWeek.filter((day) => !omitDays.includes(day.day));
  }
  return (
    <ul className="grid md:grid-cols-1 grid-cols-2 gap-2">
      {daysToRender.map((day) => (
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
    <div className="overflow-auto max-h-96" style={style}>
      <ul className="divide-y divide-gray-200 ">
        {events.map((item) => {
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
  return <div className="border p-4 md:w-3/4 lg:w-1/2 w-full">{children}</div>;
};
