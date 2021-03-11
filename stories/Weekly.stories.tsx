import React from 'react';
import { Meta, Story } from '@storybook/react';
import { addDays, format, startOfWeek, subDays, subHours } from 'date-fns';
import {
  WeeklyCalendar,
  WeeklyDays,
  WeeklyBody,
  DefaultWeeklyEventItem,
  WeeklyContainer,
  WeeklyResponsiveContainer,
} from '../src';
import '../src/tailwind.css';

export const BasicWeeklyCalendar: Story = args => {
  return (
    <WeeklyResponsiveContainer>
      <WeeklyCalendar week={args.week}>
        <WeeklyContainer>
          <WeeklyDays omitDays={args.hideWeekend ? [0, 6] : undefined} />
          <WeeklyBody
            style={{ maxHeight: args.hideWeekend ? '18rem' : '26rem' }}
            events={[
              { title: 'Janet smith', date: subDays(new Date(), 3) },
              { title: 'Max Smith', date: subDays(new Date(), 1) },
              { title: 'Code', date: subHours(new Date(), 4) },
              { title: 'Call Emma', date: subHours(new Date(), 3) },
              { title: 'Eat lunch', date: subHours(new Date(), 2) },
              { title: 'Sleep', date: subHours(new Date(), 1) },
              { title: 'Meeting with Bob', date: new Date() },
              { title: 'John smith', date: addDays(new Date(), 1) },
              { title: 'Jane doe', date: addDays(new Date(), 3) },
              { title: 'Janet smith', date: subDays(new Date(), 4) },
              { title: 'Max Smith', date: subDays(new Date(), 5) },
              { title: 'John smith', date: addDays(new Date(), 4) },
              { title: 'Jane doe', date: addDays(new Date(), 5) },
            ]}
            renderItem={({ item, showingFullWeek }) => (
              <DefaultWeeklyEventItem
                key={item.date.toISOString()}
                title={item.title}
                date={
                  showingFullWeek
                    ? format(item.date, 'MMM do k:mm')
                    : format(item.date, 'k:mm')
                }
              />
            )}
          />
        </WeeklyContainer>
      </WeeklyCalendar>
    </WeeklyResponsiveContainer>
  );
};

export default {
  title: 'Weekly Calendar',
  component: BasicWeeklyCalendar,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    hideWeekend: {
      description:
        'Sets an array of days to hide, 0 is Sunday, 1 is monday, etc',
      control: 'boolean',
    },
    week: {
      description: 'The current week to view',
      control: 'date',
      defaultValue: startOfWeek(new Date()),
    },
  },
} as Meta;
