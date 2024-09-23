// components/Timeline.tsx
import React from "react";

type TimelineItem = {
  title: string;
  date: string;
  description: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
};

type TimelineProps = {
  items: TimelineItem[];
};

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <ol className="relative border-s border-gray-200 dark:border-gray-700 m-12">
      {items.map((item, index) => (
        <li key={index} className="mb-10 ms-10">
          {/* Icon */}
          <span className="absolute flex items-center justify-center w-12 h-12 p-2 bg-blue-100 rounded-full -start-6 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            {item.icon}
          </span>

          {/* Title */}
          <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            {item.title}
          </h3>

          {/* Date */}
          <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            {item.date}
          </time>

          {/* Description */}
          <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
            {item.description}
          </p>

          {/* Action Button or Link */}
          {item.action && <div className="mt-2">{item.action}</div>}
        </li>
      ))}
    </ol>
  );
};

export default Timeline;
