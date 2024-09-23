"use client";
import { Icon } from "@iconify/react";
import { Tab, Tabs, Tooltip } from "@nextui-org/react";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

export interface MenuProps {
  key: string;
  tooltipText?: string;
}

export interface DotNavigationProps {
  menus: MenuProps[];
  tooltipPlacement: "left" | "right" | "top" | "bottom";
  onTabChange?: (tab: string) => void;
}

interface SwitchTabHandle {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export function DotNavigation(props: DotNavigationProps & SwitchTabHandle) {
  const { menus, tooltipPlacement } = props;
  const isVertical = ["left", "right"].includes(tooltipPlacement);
  const { currentTab, setCurrentTab } = props;

  useEffect(() => {
    props.onTabChange?.(currentTab);
  }, [currentTab]);

  if (!menus.length) {
    return <></>;
  }

  return (
    <Tabs
      size="md"
      radius="full"
      variant="light"
      aria-label="Options"
      isVertical={isVertical}
      selectedKey={currentTab}
      onSelectionChange={(e) => {
        console.log(e);
        setCurrentTab(e.toString());
      }}
      classNames={{ tabList: "gap-1" }}
    >
      {menus.map(({ key, tooltipText }) => (
        <Tab
          className="px-1"
          key={key}
          title={
            <div className={`${currentTab === key ? "text-2xl" : ""}`}>
              {tooltipText ? (
                <Tooltip
                  delay={0}
                  closeDelay={0}
                  showArrow
                  placement={tooltipPlacement}
                  content={tooltipText}
                  offset={8}
                  color="foreground"
                >
                  <Icon
                    icon={`${
                      currentTab === key
                        ? "octicon:dot-fill-16"
                        : "octicon:dot-16"
                    }`}
                  />
                </Tooltip>
              ) : (
                <Icon
                  icon={`${
                    currentTab === key
                      ? "octicon:dot-fill-16"
                      : "octicon:dot-16"
                  }`}
                />
              )}
            </div>
          }
        />
      ))}
    </Tabs>
  );
}

const generatePlacementClassName = (
  placement: "left" | "right" | "top" | "bottom"
) => {
  switch (placement) {
    case "right":
      return "px-2 right-0 top-0 h-screen fixed flex flex-row justify-center items-center";
    case "left":
      return "px-2 left-0 top-0 h-screen fixed flex flex-row justify-center items-center";
    case "top":
      return "py-2 left-0 top-0 w-screen fixed flex flex-row justify-center items-center";
    case "bottom":
      return "py-2 left-0 bottom-0 w-screen fixed flex flex-row justify-center items-center";
  }
};

export interface DotNavigationHandle {
  setCurrentTab: (tab: string) => void;
}

export const DotNavigationLayer = forwardRef<
  DotNavigationHandle,
  DotNavigationProps
>((props, ref) => {
  const pageKeys = props.menus.map(({ key }) => key);
  const [currentTab, setCurrentTab] = useState(pageKeys[0]);

  useImperativeHandle(ref, () => ({
    setCurrentTab: (tab: string) => {
      if (pageKeys.includes(tab)) {
        setCurrentTab(tab);
      }
    },
  }));

  return (
    <div
      // className={`left-0 top-0 fixed box-border h-screen w-full z-10 px-4 flex flex-row ${items} ${justify}`}
      className={`z-10 ${generatePlacementClassName(props.tooltipPlacement)}`}
    >
      <DotNavigation
        {...props}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
    </div>
  );
});

DotNavigationLayer.displayName = "DotNavigationLayer";
