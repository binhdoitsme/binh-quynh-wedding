// components/Timeline.tsx
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
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
  const textSlideFromLeft = {
    initial: { opacity: 0, transform: "translateX(-10px)" },
    animate: { opacity: 1, transform: "translateX(0)" },
    exit: { opacity: 0, transform: "translateX(-10px)" },
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      delay: 0.25,
    },
  };

  const simpleFade = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      delay: 0.3,
    },
  };

  return (
    <motion.ol
      className="w-5/6 md:w-2/3 m-6 mb-2 text-medium md:text-base leading-5 md:leading-none"
    >
      {items.map((item, index) => (
        <motion.li key={index} className="flex flex-row -ms-6 md:ms-0">
          <motion.div className="w-20 md:w-auto">
            <motion.svg viewBox="0 0 500 1000" className="w-24">
              <motion.line
                className="stroke-red-200"
                x1="250"
                y1="275"
                x2="250"
                y2="1050"
                strokeDasharray="0 1"
                strokeWidth="4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                exit={{ pathLength: 0 }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                  delay: 0.25,
                }}
              />
              <motion.circle
                className="stroke-red-700"
                r="125"
                cx="250"
                cy="150"
                fill="transparent"
                strokeWidth="8"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                exit={{ pathLength: 0 }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                }}
                strokeDasharray="0 1"
              />
              <motion.circle
                className="stroke-red-700 hover:ring-4"
                r="125"
                cx="250"
                cy="150"
                fill="#b91c1c"
                strokeWidth="1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{
                  duration: 1,
                  ease: "circInOut",
                }}
                strokeDasharray="0 1"
              />
              {item.icon}
            </motion.svg>
          </motion.div>
          <motion.div className="ms-4 py-4 grid grid-cols-12 gap-2">
            <motion.h2
              className="text-xl font-bold col-span-12"
              {...textSlideFromLeft}
            >
              {item.title}
            </motion.h2>
            {/* Date */}
            <motion.div className="col-span-2 md:col-span-1" {...simpleFade}>
              <Icon icon="ion:calendar-outline" />
            </motion.div>
            <motion.div
              className="col-span-10 md:col-span-11 md:-mx-6"
              {...textSlideFromLeft}
            >
              <p className="font-normal text-gray-600 dark:text-gray-400">
                {item.date}
              </p>
            </motion.div>
            {/* Time */}
            <motion.div className="col-span-2 md:col-span-1" {...simpleFade}>
              <Icon icon="ion:time-outline" />
            </motion.div>
            <motion.div
              className="col-span-10 md:col-span-11 md:-mx-6"
              {...textSlideFromLeft}
            >
              <p className="font-normal text-gray-600 dark:text-gray-400">
                {item.time}
              </p>
            </motion.div>

            {/* Location */}
            <motion.div className="col-span-2 md:col-span-1" {...simpleFade}>
              <Icon icon="ph:map-pin" />
            </motion.div>
            <motion.div
              className="col-span-10 md:col-span-11 md:-mx-6"
              {...textSlideFromLeft}
            >
              <p className="font-normal text-gray-600 dark:text-gray-400">
                {item.location}
              </p>
            </motion.div>

            {/* Action Button or Link */}
            <motion.div {...simpleFade}>
              {item.action && (
                <div className="mt-2">
                  {typeof item.action === "function"
                    ? item.action(item)
                    : item.action}
                </div>
              )}
            </motion.div>
          </motion.div>
        </motion.li>
      ))}
    </motion.ol>
  );
};

export default Timeline;
