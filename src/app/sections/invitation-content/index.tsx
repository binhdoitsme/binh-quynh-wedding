"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, ScrollShadow } from "@nextui-org/react";
import Timeline, { TimelineItem } from "./timeline";
import { HeartsIcon, PartyChampagneIcon, WeddingRingsIcon } from "./icons";
import { useInView } from "@/hooks/views";
import { AnimatePresence } from "framer-motion";
import { UnderlinedHeading } from "@/components/heading/underlined-heading";

export function InvitationContent() {
  const renderMapMarkerButton = (item: TimelineItem) => (
    <Button
      href={item.locationUrl}
      target="_blank"
      className="inline-flex items-center px-4 py-2 text-sm font-medium bg-transparent border border-yellow-500 text-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-white focus:z-10"
      as="a"
    >
      <Icon icon="mdi:map-search-outline" />
      Chỉ đường
    </Button>
  );
  const timelineData: TimelineItem[] = [
    {
      title: "Tiệc nhà gái",
      date: "Thứ 6, ngày 01 tháng 11 năm 2024",
      time: "16:30",
      location: "Nhà gái - Ngõ 3 TDP Liên Sơn, Hùng Sơn, Đại Từ, Thái Nguyên",
      locationUrl: "https://maps.app.goo.gl/HrraXkswfqJFsQRr7",
      icon: <PartyChampagneIcon className="text-white" />,
      action: renderMapMarkerButton,
    },
    {
      title: "Lễ Vu Quy",
      time: "08:30",
      date: "Thứ 7, ngày 02 tháng 11 năm 2024",
      location: "Nhà gái - Ngõ 3 TDP Liên Sơn, Hùng Sơn, Đại Từ, Thái Nguyên",
      locationUrl: "https://maps.app.goo.gl/HrraXkswfqJFsQRr7",
      icon: <HeartsIcon className="text-white" />,
      action: renderMapMarkerButton,
    },
    {
      title: "Lễ Thành Hôn & Tiệc nhà trai",
      date: "Thứ 7, ngày 02 tháng 11 năm 2024",
      time: "16:30",
      location: "Nhà hàng Đại Lộc - Số 280 Lạch Tray, Ngô Quyền, Hải Phòng",
      locationUrl: "https://maps.app.goo.gl/6tvZLDcj12gJwBbx9",
      icon: <WeddingRingsIcon className="invert" />,
      action: renderMapMarkerButton,
    },
  ];

  const { isInView, ref } = useInView();

  return (
    <ScrollShadow
      ref={ref}
      className="w-full h-full flex flex-col items-center py-4"
    >
      <UnderlinedHeading text="Sự kiện cưới" />
      <AnimatePresence mode="wait">
        {isInView && <Timeline items={timelineData} />}
      </AnimatePresence>
    </ScrollShadow>
  );
}
