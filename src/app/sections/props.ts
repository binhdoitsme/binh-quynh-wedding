import { MenuProps } from "@/components/dotnav";
import { RefObject } from "react";

export interface SectionProps {
  attachMenu?: (
    menuProps: MenuProps,
    ref: RefObject<HTMLElement | null>
  ) => void;

  updateActiveMenu?: (key: string) => void;
}
