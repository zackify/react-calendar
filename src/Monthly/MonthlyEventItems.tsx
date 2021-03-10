import React from 'react';

/*
  Over time there may be more useful event item components that can be included
  in the library
*/

type DefaultEventItemProps = {
  title: string;
  date: string;
};

export const DefaultMonthlyEventItem = ({
  title,
  date,
}: DefaultEventItemProps) => {
  return (
    <li className="py-2">
      <div className="flex text-sm flex-1 justify-between">
        <h3 className="font-medium">{title}</h3>
        <p className="text-gray-500">{date}</p>
      </div>
    </li>
  );
};
