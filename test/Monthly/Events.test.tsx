import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { startOfMonth } from 'date-fns';
import {
  MonthlyCalendarTest,
  MonthlyCalendarWithDateChange,
} from './TestComponents';

test('Renders event on correct day', () => {
  render(
    <MonthlyCalendarTest
      events={[{ title: 'Call bob', date: new Date(2021, 3, 4) }]}
      currentMonth={startOfMonth(new Date(2021, 3, 1))}
      onCurrentMonthChange={() => true}
    />
  );

  //check the html inside the event day
  let eventDay = screen.getByLabelText('Events for day 4').textContent;
  expect(eventDay).toContain('Call bob');

  let eventItem = screen.getAllByText('Call bob');
  expect(eventItem.length).toEqual(1);
});

test('Hides event when the month changes', () => {
  render(
    <MonthlyCalendarWithDateChange
      events={[{ title: 'Call bob', date: new Date(2021, 3, 4) }]}
      currentMonth={startOfMonth(new Date(2021, 3, 1))}
    />
  );

  //check the html inside the event day
  let eventDay = screen.getByLabelText('Events for day 4').textContent;
  expect(eventDay).toContain('Call bob');

  let eventItem = screen.getAllByText('Call bob');
  expect(eventItem.length).toEqual(1);

  fireEvent.click(screen.getByText('Next'));

  expect(screen.queryByText('Call bob')).toEqual(null);
});
