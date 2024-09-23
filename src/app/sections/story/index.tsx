"use client";

import { useEffect } from "react";
import { SectionProps } from "../props";
import { useInView } from "@/hooks/views";

const menuProps = {
  key: "story",
  tooltipText: "Our love story",
};

export function Story(props: SectionProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  useEffect(() => {
    props.attachMenu?.(menuProps, ref);
  }, []);

  useEffect(() => {
    if (isInView) {
      props.updateActiveMenu?.(menuProps.key);
    }
  }, [isInView]);

  return (
    <div id={menuProps.key} ref={ref} className={`w-full h-screen`}>
      Story
    </div>
  );
}
