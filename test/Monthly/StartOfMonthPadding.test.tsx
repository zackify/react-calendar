import React from 'react';
import { screen, render } from '@testing-library/react';
import { startOfMonth } from 'date-fns';
import { MonthlyCalendarTest } from './TestComponents';

describe('March 2021', () => {
  test('renders 1 empty day', () => {
    render(
      <MonthlyCalendarTest
        events={[]}
        currentMonth={startOfMonth(new Date(2021, 2, 1))}
        onCurrentMonthChange={() => true}
      />
    );

    let totalPadded = screen.getAllByLabelText('Empty Day');

    expect(totalPadded.length).toEqual(1);
  });
  test('renders 0 empty days if I omit sunday', () => {
    render(
      <MonthlyCalendarTest
        events={[]}
        omitDays={[0]}
        currentMonth={startOfMonth(new Date(2021, 2, 1))}
        onCurrentMonthChange={() => true}
      />
    );

    let totalPadded = screen.queryAllByLabelText('Empty Day');

    expect(totalPadded.length).toEqual(0);
  });
});
describe('April 2021', () => {
  test('renders 4 empty days', () => {
    render(
      <MonthlyCalendarTest
        events={[]}
        currentMonth={startOfMonth(new Date(2021, 3, 1))}
        onCurrentMonthChange={() => true}
      />
    );

    let totalPadded = screen.getAllByLabelText('Empty Day');

    expect(totalPadded.length).toEqual(4);
  });
  test('renders 3 empty days if I omit sunday', () => {
    render(
      <MonthlyCalendarTest
        events={[]}
        omitDays={[0]}
        currentMonth={startOfMonth(new Date(2021, 3, 1))}
        onCurrentMonthChange={() => true}
      />
    );

    let totalPadded = screen.queryAllByLabelText('Empty Day');

    expect(totalPadded.length).toEqual(3);
  });
  test('renders 2 empty days if I omit sunday and monday', () => {
    render(
      <MonthlyCalendarTest
        events={[]}
        omitDays={[0, 1]}
        currentMonth={startOfMonth(new Date(2021, 3, 1))}
        onCurrentMonthChange={() => true}
      />
    );

    let totalPadded = screen.queryAllByLabelText('Empty Day');

    expect(totalPadded.length).toEqual(2);
  });
});
