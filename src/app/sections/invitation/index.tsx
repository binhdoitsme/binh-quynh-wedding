import { SectionProps } from "../props";
import { Content } from "./content";
import { Cover } from "./cover";

export function Invitation(props: SectionProps) {
  return (
    <>
      <Cover {...props} />
      <Content {...props} />
    </>
  );
}
