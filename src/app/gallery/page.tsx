"use client";
import {
  DotNavigationHandle,
  DotNavigationLayer,
  MenuProps,
} from "@/components/dotnav";
import { RefObject, useRef, useState } from "react";
import { Gallery } from "../sections/gallery";
import { Invitation } from "../sections/invitation";
import { RSVP } from "../sections/rsvp";
import { Story } from "../sections/story";

export default function GalleryPage() {
  // const menus: MenuProps[] = [
  //   { key: "1", tooltipText: "One" },
  //   { key: "2", tooltipText: "Two" },
  //   { key: "3", tooltipText: "Three" },
  //   { key: "4", tooltipText: "One" },
  //   { key: "5", tooltipText: "Two" },
  //   // { key: "^", tooltipText: "Three" },
  // ];

  const [menus, setMenus] = useState<{ [key: string]: MenuProps }>({});
  const [menuRefMapping, setMenuRefMapping] = useState<{
    [key: string]: RefObject<HTMLElement | null>;
  }>({});
  const dotNavigationRef = useRef<DotNavigationHandle | null>(null);

  const attachMenu = (
    menuProps: MenuProps,
    ref: RefObject<HTMLElement | null>
  ) => {
    if (menuProps.key in menuRefMapping) {
      return;
    }
    setMenus((menus) => ({ ...menus, [menuProps.key]: menuProps }));
    setMenuRefMapping((menuRefMapping) => ({
      ...menuRefMapping,
      [menuProps.key]: ref,
    }));
  };

  const updateActiveMenu = (tab: string) =>
    dotNavigationRef?.current?.setCurrentTab(tab);
  return (
    <>
      <Invitation attachMenu={attachMenu} updateActiveMenu={updateActiveMenu} />
      <Story attachMenu={attachMenu} updateActiveMenu={updateActiveMenu} />
      <Gallery attachMenu={attachMenu} updateActiveMenu={updateActiveMenu} />
      <RSVP attachMenu={attachMenu} updateActiveMenu={updateActiveMenu} />
      <DotNavigationLayer
        ref={dotNavigationRef}
        menus={Object.values(menus)}
        tooltipPlacement="right"
        onTabChange={(tab) =>
          menuRefMapping[tab]?.current?.scrollIntoView({ behavior: "smooth" })
        }
      />
    </>
  );
}
