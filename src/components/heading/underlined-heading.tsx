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
    <div
      className="text-yellow-400 flex flex-col items-center"
      style={{ width: "fit-content" }}
    >
      <h1
        className={`${scriptFont.className} ${fontSize} text-center mt-4 pr-2`}
        style={{ textShadow: "1px 1px 2px #eeeeee" }}
      >
        {props.text}
      </h1>
      <Divider
        className="my-4 w-1/2 bg-yellow-400"
        style={{ boxShadow: "1px 1px 2px #eeeeee" }}
      />
    </div>
  );
}
