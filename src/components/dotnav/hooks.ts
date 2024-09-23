import { RefObject, useEffect, useRef, useState } from "react";
import { SectionProps } from "./section";
import useScrollObserver from "@/hooks/scroll";

type DotNavigationHandle = {
  setCurrentTab: (tab: string) => void;
};

export function useDotNavigationHooks() {
  const [sections, setSections] = useState<{ [key: string]: SectionProps }>({});
  const [sectionRefMapping, setSectionRefMapping] = useState<{
    [key: string]: RefObject<HTMLElement | null>;
  }>({});
  const [isScrollingToTab, setIsScrollingToTab] = useState(false);
  const dotNavigationRef = useRef<DotNavigationHandle | null>(null);
  const isScrolling = useScrollObserver();

  const attachSection = (
    props: SectionProps,
    ref: RefObject<HTMLElement | null>
  ) => {
    if (props.sectionKey in sectionRefMapping) {
      return;
    }
    setSections((menus) => ({ ...menus, [props.sectionKey]: props }));
    setSectionRefMapping((menuRefMapping) => ({
      ...menuRefMapping,
      [props.sectionKey]: ref,
    }));
  };

  const updateActiveSection = (tab: string) => {
    dotNavigationRef?.current?.setCurrentTab(tab);
  };

  useEffect(() => {
    if (!isScrolling && isScrollingToTab) {
      setIsScrollingToTab(false);
    }
  }, [isScrolling, isScrollingToTab]);

  return {
    attachSection,
    updateActiveSection,
    dotNavigationRef,
    menus: sections,
    scrollToTab: (tab: string) => {
      setIsScrollingToTab(true);
      sectionRefMapping[tab]?.current?.scrollIntoView({ behavior: "smooth" });
    },
  };
}
