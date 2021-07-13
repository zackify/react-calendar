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
    <li className="rc-py-2">
      <div className="rc-flex rc-text-sm rc-flex-1 rc-justify-between">
        <h3 className="rc-font-medium">{title}</h3>
        <p className="rc-text-gray-500">{date}</p>
      </div>
    </li>
  );
};
