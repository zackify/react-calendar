import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { addDays, subDays, subHours } from 'date-fns';
import { WeeklyCalendarTest } from './TestComponents';

let testDate = '2021-03-03T00:39:27.448Z';
test('Renders full week initially', () => {
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

  // check that all 3 are on screen
  screen.getByText('Janet smith');
  screen.getByText('Max Smith');
  screen.getByText('Code');

  screen.getByText('Mar 1st 24:00');
});

test('Hides event from next week', () => {
  render(
    <WeeklyCalendarTest
      week={new Date(testDate)}
      events={[
        { title: 'Janet smith', date: subDays(new Date(testDate), 2) },
        { title: 'Max Smith', date: subDays(new Date(testDate), 1) },
        { title: 'Code', date: subHours(new Date(testDate), 4) },
        { title: 'Next week', date: addDays(new Date(testDate), 7) },
      ]}
    />
  );

  // check that all 3 are on screen
  screen.getByText('Janet smith');
  screen.getByText('Max Smith');
  screen.getByText('Code');

  screen.getByText('Mar 1st 24:00');
  expect(screen.queryByText('Next week')).toEqual(null);
});

test('Renders single day after click', () => {
  render(
    <WeeklyCalendarTest
      week={new Date(testDate)}
      events={[
        { title: 'Janet smith', date: subDays(new Date(testDate), 3) },
        { title: 'Max Smith', date: subDays(new Date(testDate), 1) },
        { title: 'Code', date: subHours(new Date(testDate), 4) },
      ]}
    />
  );

  fireEvent.click(screen.getByText('Sunday 28th'));

  screen.getByText('Janet smith');
  expect(screen.queryByText('Max Smith')).toEqual(null);
  expect(screen.queryByText('Code')).toEqual(null);

  screen.getByText('24:00');
});

test('Renders week after clicking a selected day', () => {
  render(
    <WeeklyCalendarTest
      week={new Date(testDate)}
      events={[
        { title: 'Janet smith', date: subDays(new Date(testDate), 3) },
        { title: 'Max Smith', date: subDays(new Date(testDate), 1) },
        { title: 'Code', date: subHours(new Date(testDate), 4) },
      ]}
    />
  );

  fireEvent.click(screen.getByText('Sunday 28th'));

  screen.getByText('Janet smith');
  expect(screen.queryByText('Max Smith')).toEqual(null);
  expect(screen.queryByText('Code')).toEqual(null);

  fireEvent.click(screen.getByText('Sunday 28th'));

  // check that all 3 are on screen
  screen.getByText('Janet smith');
  screen.getByText('Max Smith');
  screen.getByText('Code');
});
