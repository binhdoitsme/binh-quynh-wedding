import { useInView } from "@/hooks/views";
import React, { RefObject, useEffect } from "react";

export type SectionProps = {
  sectionKey: string;
  tooltipText?: string;
};

export type SectionHandles = {
  attachMenu?: (
    props: SectionProps,
    ref: RefObject<HTMLElement | null>
  ) => void;

  updateActiveMenu?: (sectionKey: string) => void;
};

export type HasAdditionalClassNames = {
  className?: string;
};

type HasChildren = { children: React.ReactNode };

export function Section(
  props: SectionHandles & SectionProps & HasChildren & HasAdditionalClassNames
) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  useEffect(() => {
    props.attachMenu?.(props, ref);
  }, []);

  useEffect(() => {
    if (isInView) {
      props.updateActiveMenu?.(props.sectionKey);
    }
  }, [isInView]);

  return (
    <div
      id={props.sectionKey}
      ref={ref}
      className={`w-full h-screen ${props.className ?? ""}`}
    >
      {props.children}
    </div>
  );
}
