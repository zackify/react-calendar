import React from 'react';
import { format } from 'date-fns';
import {
  WeeklyCalendar,
  WeeklyDays,
  WeeklyBody,
  DefaultWeeklyEventItem,
  WeeklyContainer,
} from '../../src';

type Props = {
  week: Date;
  omitDays?: number[];
  locale?: Locale;
  events: { title: string; date: Date }[];
};
export const WeeklyCalendarTest = ({
  week,
  events,
  omitDays,
  locale,
}: Props) => {
  return (
    <div style={{ width: 500 }} className="border p-4">
      <WeeklyCalendar week={week} locale={locale}>
        <WeeklyContainer>
          <WeeklyDays omitDays={omitDays} />
          <WeeklyBody
            events={events}
            renderItem={({ item, showingFullWeek }) => (
              <DefaultWeeklyEventItem
                key={item.date.toISOString()}
                title={item.title}
                date={
                  showingFullWeek
                    ? format(item.date, 'MMM do k:mm', { locale })
                    : format(item.date, 'k:mm', { locale })
                }
              />
            )}
          />
        </WeeklyContainer>
      </WeeklyCalendar>
    </div>
  );
};
