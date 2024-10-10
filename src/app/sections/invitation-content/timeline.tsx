// components/Timeline.tsx
import { Icon } from "@iconify/react";
import { motion, stagger, useAnimate } from "framer-motion";
import React, { useEffect } from "react";

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
  isInView: boolean;
};

const Timeline: React.FC<TimelineProps> = ({ items, isInView }) => {
  const [scope, animate] = useAnimate();

  const enter = async () => {
    await Promise.all([
      animate(
        ".__text_slide__",
        { opacity: 1, transform: "translateX(0)" },
        { duration: 0.5, ease: "easeInOut", delay: stagger(0.25) }
      ),
      animate(
        ".__simple_fade__",
        { opacity: 1 },
        { duration: 0.5, ease: "easeInOut", delay: stagger(0.25) }
      ),
      animate(
        ".__circle_path__",
        { pathLength: 1 },
        { duration: 1.5, ease: "easeInOut", delay: stagger(0.75) }
      ),
      animate(
        ".__line_path__",
        { pathLength: 1 },
        { duration: 1.5, ease: "easeInOut", delay: stagger(0.75) }
      ),
      animate(
        ".__circle_scale__",
        { scale: [0, 1] },
        { duration: 1, ease: "circInOut", delay: stagger(1) }
      ),
    ]);
  };
  const exit = async () => {
    await Promise.all([
      animate(
        ".__text_slide__",
        { opacity: 0, transform: "translateX(-10px)" },
        { duration: 0.5, ease: "easeInOut" }
      ),
      animate(
        ".__simple_fade__",
        { opacity: 0 },
        { duration: 0.5, ease: "easeInOut" }
      ),
      animate(
        ".__circle_path__",
        { pathLength: 0 },
        { duration: 0.5, ease: "easeInOut" }
      ),
      animate(
        ".__line_path__",
        { pathLength: 0 },
        { duration: 0.5, ease: "easeInOut" }
      ),
      animate(
        ".__circle_scale__",
        { scale: 0 },
        { duration: 1.5, ease: "circInOut" }
      ),
    ]);
  };

  useEffect(() => {
    if (isInView) {
      enter();
    } else {
      exit();
    }
  }, [isInView]);

  return (
    <ol
      ref={scope}
      className="w-5/6 md:w-2/3 m-6 mb-2 text-medium md:text-base leading-5 md:leading-none"
    >
      {items.map((item, index) => (
        <li key={index} className="flex flex-row -ms-6 md:ms-0">
          <div className="w-20 md:w-auto">
            <svg viewBox="0 0 500 1000" className="w-24">
              <line
                className="stroke-red-200 __line_path__"
                x1="250"
                y1="275"
                x2="250"
                y2="1050"
                strokeDasharray="0 1"
                strokeWidth="4"
              />
              <circle
                className="stroke-red-700 __circle_path__"
                r="125"
                cx="250"
                cy="150"
                fill="transparent"
                strokeWidth="8"
                strokeDasharray="0 1"
              />
              <motion.circle
                className="stroke-red-700 hover:ring-4 __circle_scale__"
                r="125"
                cx="250"
                cy="150"
                fill="#b91c1c"
                strokeWidth="1"
                strokeDasharray="0 1"
                style={{ transformOrigin: "center" }}
              />
              {item.icon}
            </svg>
          </div>
          <div className="ms-4 py-4 grid grid-cols-12 gap-2">
            <h2 className="text-xl font-bold col-span-12 __text_slide__">
              {item.title}
            </h2>
            {/* Date */}
            <div className="col-span-2 md:col-span-1 __simple_fade__">
              <Icon icon="ion:calendar-outline" />
            </div>
            <div className="col-span-10 md:col-span-11 md:-mx-6 __text_slide__">
              <p className="font-normal text-gray-600">{item.date}</p>
            </div>
            {/* Time */}
            <div className="col-span-2 md:col-span-1 __simple_fade__">
              <Icon icon="ion:time-outline" />
            </div>
            <div className="col-span-10 md:col-span-11 md:-mx-6 __text_slide__">
              <p className="font-normal text-gray-600">{item.time}</p>
            </div>

            {/* Location */}
            <div className="col-span-2 md:col-span-1 __simple_fade__">
              <Icon icon="ph:map-pin" />
            </div>
            <div className="col-span-10 md:col-span-11 md:-mx-6 __text_slide__">
              <p className="font-normal text-gray-600">{item.location}</p>
            </div>

            {/* Action Button or Link */}
            <div className="__simple_fade__">
              {item.action && (
                <div className="mt-2">
                  {typeof item.action === "function"
                    ? item.action(item)
                    : item.action}
                </div>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
};

export default Timeline;
