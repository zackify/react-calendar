import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { startOfMonth } from 'date-fns';
import {
  MonthlyCalendarTest,
  MonthlyCalendarWithDateChange,
} from './TestComponents';
import { es, zhCN } from 'date-fns/locale';

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

test('Renders event with locale', () => {
  render(
    <MonthlyCalendarTest
      locale={zhCN}
      events={[{ title: 'Call bob', date: new Date(2021, 3, 4) }]}
      currentMonth={startOfMonth(new Date(2021, 3, 1))}
      onCurrentMonthChange={() => true}
    />
  );

  //check that the month nav date is in chinese
  screen.getByText('四月');

  //check the html inside the event day
  let eventDay = screen.getByLabelText('Events for day 4').textContent;
  expect(eventDay).toContain('Call bob');

  let eventItem = screen.getAllByText('Call bob');
  expect(eventItem.length).toEqual(1);
});

test('Renders weekdays in english', () => {
  render(
    <MonthlyCalendarTest
      events={[{ title: 'Call bob', date: new Date(2021, 3, 4) }]}
      currentMonth={startOfMonth(new Date(2021, 3, 1))}
      onCurrentMonthChange={() => true}
    />
  );

  //check that the month nav date is in chinese
  screen.getAllByText('Monday');
  screen.getAllByText('Tuesday');
  screen.getAllByText('Wednesday');
  screen.getAllByText('Thursday');
  screen.getAllByText('Friday');
  screen.getAllByText('Saturday');
  screen.getAllByText('Sunday');
});

test('Renders weekdays in spanish', () => {
  render(
    <MonthlyCalendarTest
      locale={es}
      events={[{ title: 'Call bob', date: new Date(2021, 3, 4) }]}
      currentMonth={startOfMonth(new Date(2021, 3, 1))}
      onCurrentMonthChange={() => true}
    />
  );

  //check that the month nav date is in chinese
  screen.getAllByText('domingo');
  screen.getAllByText('lunes');
  screen.getAllByText('martes');
  screen.getAllByText('miércoles');
  screen.getAllByText('jueves');
  screen.getAllByText('viernes');
  screen.getAllByText('sábado');
});
