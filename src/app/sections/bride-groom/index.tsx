import { UnderlinedHeading } from "@/components/heading/underlined-heading";
import { imageFromSupabase } from "@/components/storage";
import { useInView } from "@/hooks/views";
import { AnimatePresence, motion } from "framer-motion";
import { Imperial_Script, Montserrat } from "next/font/google";
import Image from "next/image";

const scriptFont = Imperial_Script({
  weight: "400",
  subsets: ["vietnamese"],
});

const montserrat = Montserrat({
  weight: "400",
  subsets: ["vietnamese"],
});

const bridePhotoName = "VHU06638.jpg";
const groomPhotoName = "VHU06613.jpg";

export function BrideAndGroom() {
  const { isInView, ref } = useInView<HTMLDivElement>(0.5);

  return (
    <div
      ref={ref}
      className="w-full h-full border-y border-collapse bg-[#fafafa]"
    >
      <div className="w-full flex flex-col items-center pt-4">
        <UnderlinedHeading text="Cô dâu & Chú rể" />
      </div>
      <AnimatePresence mode="wait">
        {isInView && (
          <div className="w-full md:py-20 px-8 text-foreground flex flex-col md:flex-row justify-center items-center gap-2 md:gap-24">
            <div className="flex flex-col gap-2">
              <motion.h3
                className={`${montserrat.className} tracking-wider`}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 25 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                Cô dâu
              </motion.h3>
              <motion.h3
                className={`${scriptFont.className} text-5xl -mt-1 mb-1 -ml-1`}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 25 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                Bích Quỳnh
              </motion.h3>
              <motion.div
                className="rounded-full w-40 md:w-56 h-40 md:h-56 overflow-clip ring-white ring-8 drop-shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 1, ease: "circInOut" }}
              >
                <Image
                  className="object-cover w-full"
                  src={imageFromSupabase(bridePhotoName)}
                  height={200}
                  width={200}
                  alt="bride's photo"
                />
              </motion.div>
            </div>
            <div className="pt-5 pb-1 md:pt-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="4rem"
                height="4rem"
                viewBox="0 0 32 32"
              >
                <motion.path
                  className="stroke-red-500"
                  fill="none"
                  d="M4 16C1 12 2 6 7 4s8 2 9 4c1-2 5-6 10-4s5 8 2 12s-12 12-12 12s-9-8-12-12Z"
                  // stroke="#ff0066"
                  strokeWidth="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  initial={{ pathLength: 0, scale: 0 }}
                  animate={{ pathLength: 1, scale: 1 }}
                  exit={{ pathLength: 0, scale: 0 }} // Exit animation for path
                  transition={{
                    duration: 1,
                    ease: "backInOut",
                  }}
                />
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              <motion.h3
                className={`${montserrat.className} tracking-wider`}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 25 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                Chú rể
              </motion.h3>
              <motion.h3
                className={`${scriptFont.className} text-5xl -mt-1 mb-1 -ml-1`}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 25 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                Hải Bình
              </motion.h3>
              <motion.div
                className="rounded-full w-40 md:w-56 h-40 md:h-56 overflow-clip ring-white ring-8 drop-shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 1, ease: "circInOut" }}
              >
                <Image
                  className="object-cover w-full"
                  src={imageFromSupabase(groomPhotoName)}
                  height={200}
                  width={200}
                  alt="bride's photo"
                />
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
