import React from 'react';
import { screen, render } from '@testing-library/react';
import { subDays, subHours } from 'date-fns';
import { WeeklyCalendarTest } from './TestComponents';

let testDate = '2021-03-03T00:39:27.448Z';
test('Renders all days of the week', () => {
  render(
    <WeeklyCalendarTest
      week={new Date(testDate)}
      events={[
        { title: 'Janet smith', date: subDays(new Date(testDate), 2) },
        { title: 'Max Smith', date: subDays(new Date(testDate), 1) },
        { title: 'Code', date: subHours(new Date(testDate), 4) },
      ]}
    />
  );

  expect(screen.getAllByLabelText('Day of Week').length).toEqual(7);
});

test('Omits the weekends', () => {
  render(
    <WeeklyCalendarTest
      week={new Date(testDate)}
      omitDays={[6, 0]}
      events={[
        { title: 'Janet smith', date: subDays(new Date(testDate), 2) },
        { title: 'Max Smith', date: subDays(new Date(testDate), 1) },
        { title: 'Code', date: subHours(new Date(testDate), 4) },
      ]}
    />
  );

  expect(screen.getAllByLabelText('Day of Week').length).toEqual(5);

  expect(screen.queryByText('Saturday 6th')).toEqual(null);
  expect(screen.queryByText('Sunday 28th')).toEqual(null);
});
