"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, ScrollShadow } from "@nextui-org/react";
import Image from "next/image";
import Timeline, { TimelineItem } from "./timeline";
import WeddingRingsIcon from "./wedding-rings.svg";

export function InvitationContent() {
  const timelineData: TimelineItem[] = [
    {
      title: "Tiệc nhà gái",
      date: "Thứ 6, ngày 01 tháng 11 năm 2024",
      time: "16:30",
      location: "Nhà gái - Ngõ 3 TDP Liên Sơn, Hùng Sơn, Đại Từ, Thái Nguyên",
      locationUrl: "https://maps.app.goo.gl/HrraXkswfqJFsQRr7",
      icon: (
        <Icon className="scale-125" icon="streamline:champagne-party-alcohol" />
      ),
      action: (item) => (
        <Button
          href={item.locationUrl}
          target="_blank"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          as="a"
        >
          <Icon icon="mdi:map-search-outline" />
          Chỉ đường
        </Button>
      ),
    },
    {
      title: "Lễ Vu Quy",
      time: "08:30",
      date: "Thứ 7, ngày 02 tháng 11 năm 2024",
      location: "Nhà gái - Ngõ 3 TDP Liên Sơn, Hùng Sơn, Đại Từ, Thái Nguyên",
      locationUrl: "https://maps.app.goo.gl/HrraXkswfqJFsQRr7",
      icon: <Icon className="scale-150" icon="mdi:heart-multiple-outline" />,
      action: (item) => (
        <Button
          href={item.locationUrl}
          target="_blank"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          as="a"
        >
          <Icon icon="mdi:map-search-outline" />
          Chỉ đường
        </Button>
      ),
    },
    {
      title: "Lễ Thành Hôn & Tiệc nhà trai",
      date: "Thứ 7, ngày 02 tháng 11 năm 2024",
      time: "16:30",
      location: "Nhà hàng Đại Lộc - Số 280 Lạch Tray, Ngô Quyền, Hải Phòng",
      locationUrl: "https://maps.app.goo.gl/6tvZLDcj12gJwBbx9",
      icon: (
        <Image
          priority
          className="dark:invert w-6"
          src={WeddingRingsIcon}
          alt="Wedding Rings Icon"
        />
      ),
      action: (item) => (
        <Button
          href={item.locationUrl}
          target="_blank"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          as="a"
        >
          <Icon icon="mdi:map-search-outline" />
          Chỉ đường
        </Button>
      ),
    },
  ];

  return (
    <>
      Invitation card
      <ScrollShadow>
        <Timeline items={timelineData} />
      </ScrollShadow>
    </>
  );
}
