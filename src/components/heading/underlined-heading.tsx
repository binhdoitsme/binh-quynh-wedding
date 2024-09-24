import { Imperial_Script } from "next/font/google";
import { HeadingProps } from "./props";
import { Divider } from "@nextui-org/react";

const scriptFont = Imperial_Script({
  weight: "400",
  subsets: ["vietnamese"],
});

export function UnderlinedHeading(props: HeadingProps) {
  return (
    <div className="text-yellow-400">
      <h1
        className={`${scriptFont.className} text-6xl mt-4 pr-4 flex flex-col items-center`}
      >
        {props.text}
        <Divider className="my-4 w-2/3 bg-yellow-400" />
      </h1>
    </div>
  );
}
