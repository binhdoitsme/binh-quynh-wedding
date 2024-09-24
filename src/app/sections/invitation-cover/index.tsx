"use client";
import { useScreenSize } from "@/hooks/views";
import { Button } from "@nextui-org/react";
import { Imperial_Script, Montserrat } from "next/font/google";
import { useMemo } from "react";

const scriptFont = Imperial_Script({
  weight: "400",
  subsets: ["vietnamese"],
});

const montserrat = Montserrat({
  weight: "400",
  subsets: ["vietnamese"],
});

export type InvitationCoverProps = {
  handleViewInvitationContent?: () => void;
};

export function InvitationCover(props: InvitationCoverProps) {
  const screenSize = useScreenSize();

  const textSizes = useMemo(() => {
    if (screenSize?.device === "mobile") {
      return { script: "text-7xl", info: "text-sm", head: "text-3xl" };
    }
    return { script: "text-8xl", info: "text-md", head: "text-4xl" };
  }, [screenSize]);

  return (
    <div
      className={`${montserrat.className} w-full h-full bg-red-800 text-content1 flex flex-col justify-center items-center`}
    >
      <p className={`${montserrat.className} tracking-wider mb-2 uppercase`}>
        Save the date
      </p>
      <h1 className={`${textSizes.head} mb-4 tracking-wider`}>02.11.24</h1>
      <h1 className={`${scriptFont.className} ${textSizes.script} pr-4`}>
        Hải Bình
      </h1>
      <h1 className={`${scriptFont.className} ${textSizes.script} pr-4`}>&</h1>
      <h1 className={`${scriptFont.className} ${textSizes.script} pr-4`}>
        Bích Quỳnh
      </h1>

      <div className="mt-8">
        <Button
          variant="bordered"
          className="border-white border-1 uppercase text-content1"
          radius="sm"
          onClick={props.handleViewInvitationContent}
        >
          Xem thiệp mời
        </Button>
      </div>
    </div>
  );
}
