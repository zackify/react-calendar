import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  DefaultMonthlyEventItem,
  MonthlyBody,
  MonthlyCalendar,
  MonthlyDay,
  MonthlyNav,
} from '../../src';

type Props = {
  currentMonth: Date;
  onCurrentMonthChange: (date: Date) => any;
  omitDays?: number[];
  events: { title: string; date: Date }[];
};

export const MonthlyCalendarTest = ({
  currentMonth,
  onCurrentMonthChange,
  omitDays,
  events,
}: Props) => {
  return (
    <MonthlyCalendar
      currentMonth={currentMonth}
      onCurrentMonthChange={onCurrentMonthChange}
    >
      <MonthlyNav />
      <MonthlyBody omitDays={omitDays} events={events}>
        <MonthlyDay<Props['events'][0]>
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

type WithDateChangeProps = Omit<Props, 'onCurrentMonthChange'> & {
  onCurrentMonthChange?: (date: Date) => any;
};

export const MonthlyCalendarWithDateChange = ({
  omitDays,
  events,
  currentMonth: initialMonth,
  onCurrentMonthChange,
}: WithDateChangeProps) => {
  let [currentMonth, setCurrentMonth] = useState(initialMonth);
  return (
    <MonthlyCalendarTest
      omitDays={omitDays}
      events={events}
      currentMonth={currentMonth}
      onCurrentMonthChange={date => {
        setCurrentMonth(date);
        onCurrentMonthChange?.(date);
      }}
    />
  );
};
