"use client";

import { montserrat } from "@/app/fonts/global-fonts";
import { UnderlinedHeading } from "@/components/heading/underlined-heading";
import { imageFromSupabase } from "@/components/storage";
import { useInView } from "@/hooks/views";
import { Divider } from "@nextui-org/react";
import { stagger, useAnimate } from "framer-motion";
import Image from "next/image";
import { CSSProperties, useEffect } from "react";
import photowall from "./photowall.jpg";

export function PolaroidImage({
  imageName,
  imgStyles,
}: {
  imageName: string;
  imgStyles?: CSSProperties;
}) {
  return (
    <div className="w-44 h-32 bg-white p-1.5 pb-4 drop-shadow-sm">
      <Image
        src={imageFromSupabase(imageName)}
        width={200}
        height={200}
        alt="..."
        className="w-full h-full object-cover drop-shadow-sm"
        style={imgStyles}
      />
    </div>
  );
}

export function Story() {
  const { isInView, ref } = useInView<HTMLDivElement>();
  const [scope, animate] = useAnimate();

  const enter = async () => {
    await Promise.all([
      animate(
        ".__left__",
        { x: 0, opacity: 1 },
        { duration: 1, ease: "easeInOut", delay: stagger(0.5) }
      ),
      animate(
        ".__right__",
        { x: 0, opacity: 1 },
        { duration: 1, ease: "easeInOut", delay: stagger(0.5) }
      ),
      animate(
        ".__divider__",
        { height: "100%" },
        { duration: 3, ease: "easeInOut" }
      ),
    ]);
  };
  const exit = async () => {
    await Promise.all([
      animate(
        ".__left__",
        { x: -20, opacity: 0 },
        { duration: 1, ease: "easeInOut" }
      ),
      animate(
        ".__right__",
        { x: 20, opacity: 0 },
        { duration: 1, ease: "easeInOut" }
      ),
      animate(
        ".__divider__",
        { height: 0 },
        { duration: 1, ease: "easeInOut" }
      ),
    ]);
  };

  useEffect(() => {
    if (isInView) {
      enter();
    } else {
      exit();
    }
  }, [isInView]);

  return (
    <div
      ref={ref}
      className="w-full h-full relative top-0 left-0 border-y border-collapse"
    >
      <div className="w-full flex flex-col items-center absolute z-10 top-0 left-0 py-4">
        <UnderlinedHeading text="Câu chuyện" />
      </div>
      <div ref={scope} className="w-full h-full text-white bg-black">
        <Image
          className="h-full object-cover opacity-35"
          src={photowall}
          alt="photo wall"
        />
        <div className="absolute top-0 left-0 z-10 w-full h-full">
          <div className="w-full h-full grid grid-rows-5 p-8 md:p-4 -mt-8">
            <div className="row-span-1"></div>
            <div className="row-span-4 flex flex-row justify-around items-start gap-2">
              <div className="w-[calc(50%-2px)] h-full grid grid-rows-4 grid-cols-1 gap-2">
                <div className="flex flex-row justify-end mt-1 __left__">
                  <PolaroidImage imageName="2019_02.jpg" />
                </div>
                <div className="flex flex-col items-end __left__">
                  <h1
                    className={`${montserrat.className} text-2xl tracking-widest font-bold`}
                  >
                    2019
                  </h1>
                  <p
                    className={`${montserrat.className} tracking-wide uppercase text-right`}
                  >
                    Hẹn hò
                  </p>
                </div>
                <div className="flex flex-row justify-end mt-1 __left__">
                  <PolaroidImage imageName="IMG_6162.jpg" />
                </div>
                <div className="flex flex-col items-end __left__">
                  <h1
                    className={`${montserrat.className} text-2xl tracking-widest font-bold`}
                  >
                    2024
                  </h1>
                  <p
                    className={`${montserrat.className} tracking-wide uppercase text-right`}
                  >
                    Ngày chung đôi
                  </p>
                </div>
              </div>
              <Divider
                orientation="vertical"
                className="invert mx-4 __divider__"
              />
              <div className="w-[calc(50%-2px)] h-full grid grid-rows-4 grid-cols-1 gap-2">
                <div className="__right__">
                  <h1
                    className={`${montserrat.className} text-2xl tracking-widest font-bold`}
                  >
                    2018
                  </h1>
                  <p
                    className={`${montserrat.className} tracking-wide uppercase`}
                  >
                    Lần đầu gặp
                  </p>
                </div>
                <div className="flex flex-row justify-start mt-1 __right__">
                  <PolaroidImage imageName="2020_03.jpg" />
                </div>
                <div className="__right__">
                  <h1
                    className={`${montserrat.className} text-2xl tracking-widest font-bold`}
                  >
                    2023
                  </h1>
                  <p
                    className={`${montserrat.className} tracking-wide uppercase`}
                  >
                    Cầu hôn
                  </p>
                  <p
                    className={`${montserrat.className} tracking-wider uppercase text-sm`}
                  >
                    She said &quot;YES&quot;!
                  </p>
                </div>
                <div className="flex flex-row justify-start mt-1 __right__">
                  <PolaroidImage
                    imageName="VHU06801.jpg"
                    imgStyles={{ objectPosition: "50% 20%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
