import React from 'react';

/*
  Over time there may be more useful event item components that can be included
  in the library
*/

type DefaultWeeklyEventItemProps = {
  title: string;
  date: string;
};

export const DefaultWeeklyEventItem = ({
  title,
  date,
}: DefaultWeeklyEventItemProps) => {
  return (
    <li className="py-4 w-72">
      <div className="text-sm flex justify-between">
        <h3 className="font-medium">{title}</h3>
        <p className="text-gray-500">{date}</p>
      </div>
    </li>
  );
};
