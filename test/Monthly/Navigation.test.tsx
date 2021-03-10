import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { startOfMonth } from 'date-fns';
import { MonthlyCalendarWithDateChange } from './TestComponents';

// Set the year to 2021 globally so that these tests pass if they run in future years
let clock: any;
beforeEach(() => {
  var FakeTimers = require('@sinonjs/fake-timers');
  clock = FakeTimers.install({ now: new Date(2021, 2, 2) });
});
afterAll(() => {
  clock.uninstall();
});

test('Previous goes back 1 month', () => {
  let spy = jest.fn();
  render(
    <MonthlyCalendarWithDateChange
      events={[]}
      onCurrentMonthChange={spy}
      //April
      currentMonth={startOfMonth(new Date(2021, 3, 1))}
    />
  );

  fireEvent.click(screen.getByText('Previous'));
  screen.getByText('March');
  expect(spy.mock.calls[0][0].toISOString()).toContain('2021-03-01');
});

test('Next goes forward 1 month', () => {
  let spy = jest.fn();
  render(
    <MonthlyCalendarWithDateChange
      events={[]}
      onCurrentMonthChange={spy}
      //April
      currentMonth={startOfMonth(new Date(2021, 3, 1))}
    />
  );

  fireEvent.click(screen.getByText('Next'));
  screen.getByText('May');

  expect(spy.mock.calls[0][0].toISOString()).toContain('2021-05-01');
});

test('If on the previous year, it shows the year with month', () => {
  render(
    <MonthlyCalendarWithDateChange
      events={[]}
      //April
      currentMonth={startOfMonth(new Date(2021, 2, 1))}
    />
  );

  fireEvent.click(screen.getByText('Previous'));
  fireEvent.click(screen.getByText('Previous'));
  fireEvent.click(screen.getByText('Previous'));
  screen.getByText('December 2020');
});

test('If on the next year, it shows the year with month', () => {
  render(
    <MonthlyCalendarWithDateChange
      events={[]}
      //April
      currentMonth={startOfMonth(new Date(2021, 11, 1))}
    />
  );

  fireEvent.click(screen.getByText('Next'));
  screen.getByText('January 2022');
});
