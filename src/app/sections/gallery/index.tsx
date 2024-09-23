"use client";

import { useEffect } from "react";
import { SectionProps } from "../props";
import { useInView } from "@/hooks/views";

const menuProps = {
  key: "gallery",
  tooltipText: "Gallery",
};

export function Gallery(props: SectionProps) {
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
      Gallery
    </div>
  );
}
