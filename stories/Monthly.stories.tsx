import React, { useEffect, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { format, startOfMonth, subHours } from 'date-fns';
import {
  MonthlyBody,
  MonthlyCalendar,
  MonthlyNav,
  DefaultMonthlyEventItem,
  MonthlyDay,
} from '../src';
import '../src/tailwind.css';
import { EventType, events } from './dummyEvents';

export const BasicMonthlyCalendar: Story = args => {
  let [currentMonth, setCurrentMonth] = useState<Date>(
    startOfMonth(new Date())
  );

  return (
    <MonthlyCalendar
      currentMonth={currentMonth}
      onCurrentMonthChange={setCurrentMonth}
    >
      <MonthlyNav />
      <MonthlyBody
        omitDays={args.hideWeekend ? [0, 6] : undefined}
        events={[
          { title: 'Call John', date: subHours(new Date(), 2) },
          { title: 'Call John', date: subHours(new Date(), 1) },
          { title: 'Meeting with Bob', date: new Date() },
        ]}
      >
        <MonthlyDay<EventType>
          renderDay={data =>
            data.map((item, index) => (
              <DefaultMonthlyEventItem
                key={index}
                title={item.title}
                date={format(item.date, 'k:mm')}
              />
            ))
          }
        />
      </MonthlyBody>
    </MonthlyCalendar>
  );
};

export const MyMonthlyCalendar: Story = args => {
  let [currentMonth, setCurrentMonth] = useState<Date>(
    startOfMonth(new Date())
  );
  let eventItems =
    //use firstMonth array if its the current month
    currentMonth.toISOString() == startOfMonth(new Date()).toISOString()
      ? events.firstMonth
      : events.secondMonth;

  return (
    <MonthlyCalendar
      currentMonth={currentMonth}
      onCurrentMonthChange={setCurrentMonth}
    >
      <MonthlyNav />
      <MonthlyBody
        omitDays={args.hideWeekend ? [0, 6] : undefined}
        events={eventItems}
      >
        <MonthlyDay<EventType>
          renderDay={data =>
            data.map((item, index) => (
              <DefaultMonthlyEventItem
                key={index}
                title={item.title}
                date={format(item.date, 'k:mm')}
              />
            ))
          }
        />
      </MonthlyBody>
    </MonthlyCalendar>
  );
};

/*
  Use your own source of data,
  we pass you the timestamp for the start of the month,
  you return an array of items with anything you want
  the items must at least have a `date` key with the timestamp of the event time
*/

const useEventsByMonth = (currentMonth: Date) => {
  let [eventsForMonth, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      let nextEventItems =
        //use firstMonth array if its the current month
        currentMonth.toISOString() == startOfMonth(new Date()).toISOString()
          ? events.firstMonth
          : events.secondMonth;

      setEvents(nextEventItems);
    };
    getEvents();
  }, [currentMonth]);

  return eventsForMonth;
};
export const AsyncEvents: Story = args => {
  let [currentMonth, setCurrentMonth] = useState<Date>(
    startOfMonth(new Date())
  );
  let myEvents = useEventsByMonth(currentMonth);

  return (
    <MonthlyCalendar
      currentMonth={currentMonth}
      onCurrentMonthChange={setCurrentMonth}
    >
      <MonthlyNav />
      <MonthlyBody
        omitDays={args.hideWeekend ? [0, 6] : undefined}
        events={myEvents}
      >
        <MonthlyDay<EventType>
          renderDay={data =>
            data.map((item, index) => (
              <DefaultMonthlyEventItem
                key={index}
                title={item.title}
                date={format(item.date, 'k:mm')}
              />
            ))
          }
        />
      </MonthlyBody>
    </MonthlyCalendar>
  );
};
export default {
  title: 'Monthly Calendar',
  component: MyMonthlyCalendar,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    hideWeekend: {
      description:
        'Sets an array of days to hide, 0 is Sunday, 1 is monday, etc',
      control: 'boolean',
    },
  },
} as Meta;
