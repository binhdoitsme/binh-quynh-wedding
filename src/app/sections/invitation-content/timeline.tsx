// components/Timeline.tsx
import { Icon } from "@iconify/react";
import React from "react";

export type TimelineItem = {
  title: string;
  date: React.ReactNode;
  time: React.ReactNode;
  location?: React.ReactNode;
  locationUrl?: string;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode | ((item: TimelineItem) => React.ReactNode);
};

export type TimelineProps = {
  items: TimelineItem[];
};

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <ol className="relative border-s border-gray-200 dark:border-gray-700 m-12">
      {items.map((item, index) => (
        <li key={index} className="mb-10 ms-10 flex flex-col gap-2">
          {/* Icon */}
          <span className="absolute flex items-center justify-center w-12 h-12 p-2 bg-blue-100 rounded-full -start-6 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            {item.icon}
          </span>

          {/* Title */}
          <h3 className="flex items-center text-xl font-semibold text-gray-900 dark:text-white">
            {item.title}
          </h3>

          {/* Date */}
          <p className="text-base font-normal leading-none text-gray-500 dark:text-gray-400 flex flex-row items-center gap-2">
            <Icon icon="ion:calendar-outline" />
            <time>{item.date}</time>
          </p>

          {/* Time */}
          <p className="text-base font-normal leading-none text-gray-500 dark:text-gray-400 flex flex-row items-center gap-2">
            <Icon icon="ion:time-outline" />
            <time>{item.time}</time>
          </p>

          {/* Location */}
          <p className="text-base font-normal text-gray-500 dark:text-gray-400 flex flex-row items-center gap-2">
            <Icon icon="mdi-light:map-marker" />
            <span>{item.location}</span>
          </p>

          {/* Action Button or Link */}
          {item.action && (
            <div className="mt-2">
              {typeof item.action === "function"
                ? item.action(item)
                : item.action}
            </div>
          )}
        </li>
      ))}
    </ol>
  );
};

export default Timeline;
