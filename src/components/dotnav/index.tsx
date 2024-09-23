"use client";
import { Icon } from "@iconify/react";
import { Tab, Tabs, Tooltip } from "@nextui-org/react";
import { forwardRef, useImperativeHandle, useState } from "react";

export type MenuProps = {
  sectionKey: string;
  tooltipText?: string;
};

export type DotNavigationProps = {
  menus: MenuProps[];
  tooltipPlacement: "left" | "right" | "top" | "bottom";
  onTabChange?: (tab: string) => void;
};

type SwitchTabHandle = {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
};

export function DotNavigation(props: DotNavigationProps & SwitchTabHandle) {
  const { menus, tooltipPlacement, currentTab } = props;
  const isVertical = ["left", "right"].includes(tooltipPlacement);

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
        props.onTabChange?.(e.toString());
      }}
      classNames={{ tabList: "gap-1" }}
    >
      {menus.map(({ sectionKey, tooltipText }) => (
        <Tab
          className="px-1"
          key={sectionKey}
          title={
            <div className={`${currentTab === sectionKey ? "text-2xl" : ""}`}>
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
                      currentTab === sectionKey
                        ? "octicon:dot-fill-16"
                        : "octicon:dot-16"
                    }`}
                  />
                </Tooltip>
              ) : (
                <Icon
                  icon={`${
                    currentTab === sectionKey
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

export type DotNavigationHandle = {
  setCurrentTab: (tab: string) => void;
};

export const DotNavigationLayer = forwardRef<
  DotNavigationHandle,
  DotNavigationProps
>((props, ref) => {
  const pageKeys = props.menus.map(({ sectionKey }) => sectionKey);
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
