import {
  startOfMonth,
  addMonths,
  addHours,
  subHours,
  addDays,
  subDays,
} from 'date-fns';

export type EventType = {
  title: string;
  date: Date;
};
/*
  You should load an array of events per month from your backend
  This lets us render the calendar without loading too much at once
  Return an array of items with the date of the event, 
  and any extra properties you want
*/

export const events: { [key: string]: EventType[] } = {
  firstMonth: [
    { title: 'Call John', date: subHours(new Date(), 2) },
    { title: 'Call John', date: subHours(new Date(), 1) },
    { title: 'Meeting with Bob', date: new Date() },
    { title: 'Bike Appt', date: addHours(new Date(), 3) },
    { title: 'John Hilmer', date: addDays(new Date(), 3) },
    { title: 'Jane Call', date: subDays(new Date(), 4) },
    { title: 'Sound alarm', date: addDays(new Date(), 6) },
    { title: 'Soccer Practice', date: subDays(new Date(), 3) },
    { title: 'Alert', date: addHours(subDays(new Date(), 4), 4) },
    { title: 'Donation', date: addDays(new Date(), 6) },
  ],
  secondMonth: [
    { title: 'Meeting Next Month', date: addMonths(new Date(), 1) },
  ],
};
