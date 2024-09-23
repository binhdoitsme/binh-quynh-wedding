"use client";
import Image from "next/image";
import Timeline from "./timeline";
import WeddingRingsIcon from "./wedding-rings.svg";

export function InvitationContent() {
  const timelineData = [
    {
      title: "Flowbite Application UI v2.0.0",
      date: "Released on January 13th, 2022",
      description:
        "Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.",
      icon: <Image priority src={WeddingRingsIcon} alt="Wedding Rings Icon" />,
      action: (
        <a
          href="#"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >
          {/* <FaDownload className="w-3.5 h-3.5 me-2.5" /> */}
          Download ZIP
        </a>
      ),
    },
    {
      title: "Flowbite Figma v1.3.0",
      date: "Released on December 7th, 2021",
      description:
        "All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project.",
      icon: (
        <svg
          className="w-4 h-4 text-blue-800 dark:text-blue-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
        </svg>
      ),
    },
    {
      title: "Flowbite Library v1.2.2",
      date: "Released on December 2nd, 2021",
      description:
        "Get started with dozens of web components and interactive elements built on top of Tailwind CSS.",
      icon: (
        <svg
          className="w-4 h-4 text-blue-800 dark:text-blue-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      Invitation card
      <div>
        <Timeline items={timelineData} />
      </div>
    </>
  );
}
