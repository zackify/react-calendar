import { format, startOfMonth } from 'date-fns';
import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { events } from '../stories/dummyEvents';
import {
  MonthlyCalendar,
  MonthlyNav,
  MonthlyBody,
  DefaultMonthlyEventItem,
} from '../src';
import '../dist/calendar-tailwind.css';

export const MyMonthlyCalendar = () => {
  let [currentMonth, setCurrentMonth] = useState<Date>(
    startOfMonth(new Date())
  );
  let eventItems = events[currentMonth.toISOString()];

  return (
    <MonthlyCalendar
      currentMonth={currentMonth}
      onCurrentMonthChange={date => setCurrentMonth(date)}
    >
      <MonthlyNav />
      <MonthlyBody
        events={eventItems}
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
    </MonthlyCalendar>
  );
};

const App = () => {
  return (
    <div>
      <MyMonthlyCalendar />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
