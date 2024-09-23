"use client";
import { useInView, useScreenSize } from "@/hooks/views";
import { Button } from "@nextui-org/react";
import { Imperial_Script, Montserrat } from "next/font/google";
import { useEffect, useMemo } from "react";
import { SectionProps } from "../props";

const scriptFont = Imperial_Script({
  weight: "400",
  subsets: ["vietnamese"],
});

const montserrat = Montserrat({
  weight: "400",
  subsets: ["vietnamese"],
});

const menuProps = {
  key: "invitation-cover",
  tooltipText: "",
};

export function Cover(props: SectionProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();
  const screenSize = useScreenSize();
  const textSizes = useMemo(() => {
    if (screenSize?.device === "mobile") {
      return { script: "text-7xl", info: "text-sm", head: "text-3xl" };
    }
    return { script: "text-8xl", info: "text-md", head: "text-4xl" };
  }, [screenSize]);

  useEffect(() => {
    props.attachMenu?.(menuProps, ref);
  }, []);

  useEffect(() => {
    if (isInView) {
      props.updateActiveMenu?.(menuProps.key);
    }
  }, [isInView]);

  return (
    <div
      ref={ref}
      id={menuProps.key}
      className={`${montserrat.className} w-full h-screen bg-red-800 text-content1 flex flex-col justify-center items-center`}
    >
      <p className={`${montserrat.className} tracking-wider mb-2 uppercase`}>
        Save the date
      </p>
      <h1 className={`${textSizes.head} mb-4 tracking-wider`}>02.11.24</h1>
      <p className={`${scriptFont.className} ${textSizes.script} pr-4`}>
        Hải Bình
      </p>
      <p className={`${scriptFont.className} ${textSizes.script} pr-4`}>&</p>
      <p className={`${scriptFont.className} ${textSizes.script} pr-4`}>
        Bích Quỳnh
      </p>

      <div className="mt-8">
        <Button
          variant="bordered"
          className="border-white border-1 uppercase text-content1"
          radius="sm"
        >
          Xem thiệp mời
        </Button>
      </div>
    </div>
  );
}
