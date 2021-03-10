import React from 'react';
import { screen, render } from '@testing-library/react';
import { startOfMonth } from 'date-fns';
import { MonthlyCalendarTest } from './TestComponents';

test('Renders all 7 days', () => {
  render(
    <MonthlyCalendarTest
      events={[]}
      currentMonth={startOfMonth(new Date(2021, 3, 1))}
      onCurrentMonthChange={() => true}
    />
  );

  let totalDays = screen.getAllByLabelText('Day of Week');

  expect(totalDays.length).toEqual(7);
});

describe('March 2021', () => {
  test('Omits sunday', () => {
    render(
      <MonthlyCalendarTest
        events={[]}
        omitDays={[0]}
        currentMonth={startOfMonth(new Date(2021, 2, 1))}
        onCurrentMonthChange={() => true}
      />
    );

    let totalDays = screen.getAllByLabelText('Day of Week');
    expect(totalDays.length).toEqual(6);

    //check that the header is gone
    let sunday = screen.queryByText('Sunday');
    expect(sunday).toEqual(null);

    //ensure the days that fall on sunday are also gone
    expect(screen.queryByText('7')).toEqual(null);
    expect(screen.queryByText('14')).toEqual(null);
    expect(screen.queryByText('21')).toEqual(null);
    expect(screen.queryByText('28')).toEqual(null);
  });
});
