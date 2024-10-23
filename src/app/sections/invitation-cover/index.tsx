"use client";
import { montserrat, scriptFont } from "@/app/fonts/global-fonts";
import { OutlinedButton } from "@/components/buttons";
import { useScreenSize } from "@/hooks/views";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";


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
    <AnimatePresence mode="wait">
      <div
        className={`${montserrat.className} w-full h-full bg-red-800 text-content1 flex flex-col justify-center items-center`}
      >
        <motion.p
          className={`${montserrat.className} tracking-wider mb-2 uppercase`}
          initial={{ opacity: 0, letterSpacing: "0rem" }}
          animate={{ opacity: 1, letterSpacing: "0.05rem" }}
          exit={{ opacity: 0, letterSpacing: "0rem" }}
          transition={{ duration: 0.75 }}
        >
          Save the date
        </motion.p>
        <motion.h1
          className={`${textSizes.head} mb-4 tracking-wider`}
          initial={{ opacity: 0, letterSpacing: "0rem" }}
          animate={{ opacity: 1, letterSpacing: "0.1rem" }}
          exit={{ opacity: 0, letterSpacing: "0rem" }}
          transition={{ duration: 0.75 }}
        >
          02.11.24
        </motion.h1>
        <motion.h1
          className={`${scriptFont.className} ${textSizes.script} pr-4`}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.75, delay: 0.5, ease: "easeInOut" }}
        >
          Hải Bình
        </motion.h1>
        <motion.h1
          className={`${scriptFont.className} ${textSizes.script} pr-4`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.75, delay: 0.5, ease: "easeInOut" }}
        >
          &
        </motion.h1>
        <motion.h1
          className={`${scriptFont.className} ${textSizes.script} pr-4`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.75, delay: 0.5, ease: "easeInOut" }}
        >
          Bích Quỳnh
        </motion.h1>

        <motion.div
          className="mt-8"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.75, delay: 1, ease: "circInOut" }}
        >
          <OutlinedButton onClick={props.handleViewInvitationContent} uppercase>
            Xem thiệp mời
          </OutlinedButton>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
