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
    <li className="rc-py-4 rc-w-72">
      <div className="rc-text-sm rc-flex rc-justify-between">
        <h3 className="rc-font-medium">{title}</h3>
        <p className="rc-text-gray-500">{date}</p>
      </div>
    </li>
  );
};
