import { Imperial_Script } from "next/font/google";
import { HeadingProps } from "./props";
import { Divider } from "@nextui-org/react";
import { useScreenSize } from "@/hooks/views";

const scriptFont = Imperial_Script({
  weight: "400",
  subsets: ["vietnamese"],
});

export function UnderlinedHeading(props: HeadingProps) {
  const screenSize = useScreenSize();
  const fontSize = (screenSize?.width ?? 0) <= 768 ? "text-5xl" : "text-6xl";
  return (
    <div className="text-yellow-400">
      <h1
        className={`${scriptFont.className} ${fontSize} text-center mt-4 pr-4 flex flex-col items-center`}
      >
        {props.text}
        <Divider className="my-4 w-1/2 bg-yellow-400" />
      </h1>
    </div>
  );
}
