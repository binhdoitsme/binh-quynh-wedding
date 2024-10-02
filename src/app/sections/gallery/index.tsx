"use client";

import { UnderlinedHeading } from "@/components/heading/underlined-heading";
import { useInView, useScreenSize } from "@/hooks/views";
import { Card, ScrollShadow } from "@nextui-org/react";
import { stagger, useAnimate } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useMemo } from "react";

const baseUrl = process.env["NEXT_PUBLIC_SUPABASE_PUBLIC_URL"] ?? "";
const baseFolder = `https://${baseUrl}/storage/v1/object/public/wedding-images/public`;

const imagesDesktop = [
  "VHU06530.jpg",
  "VHU06613.jpg",
  "VHU06705.jpg",
  "VHU06686.jpg",
  "VHU06789.jpg",

  "VHU07282.jpg",
  "VHU06922.jpg",
  "VHU07151.jpg",
  "VHU06960.jpg",
  "VHU07085.jpg",
].map((src) => `${baseFolder}/${src}`);

const imagesMobile = [
  "VHU06530.jpg",
  "VHU06613.jpg",
  "VHU06705.jpg",
  "VHU06686.jpg",

  "VHU07282.jpg",
  "VHU06922.jpg",
  "VHU07151.jpg",
  "VHU06960.jpg",

  "VHU06789.jpg",
  "VHU07085.jpg",
].map((src) => `${baseFolder}/${src}`);

export function Gallery() {
  const { isInView, ref } = useInView<HTMLDivElement>(0.25);
  const [scope, animate] = useAnimate();
  const screenSize = useScreenSize();
  const images = useMemo(() => {
    if (screenSize?.device === "mobile") {
      return imagesMobile;
    }
    return imagesDesktop;
  }, [screenSize]);

  const showImages = useCallback(async () => {
    animate(
      scope.current.children,
      { scale: 1, opacity: 1 },
      { duration: 0.5, delay: stagger(0.1), ease: "circInOut" }
    );
  }, []);

  const hideImages = useCallback(async () => {
    animate(
      scope.current.children,
      { scale: 0, opacity: 0 },
      { duration: 0.5, delay: stagger(0.1), ease: "circInOut" }
    );
  }, []);

  useEffect(() => {
    if (isInView) {
      showImages();
    } else {
      hideImages();
    }
  }, [isInView]);

  return (
    <div
      ref={ref}
      className="w-full h-full border border-collapse flex flex-col items-center text-yellow-400 pt-4 pb-6 lg:pb-4"
    >
      <UnderlinedHeading text="Ảnh cưới" />
      {/* masonry layout */}
      <ScrollShadow>
        <div className="py-4 px-4 lg:px-16">
          <div ref={scope} className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {images.map((src, index) => (
              <Card
                key={index}
                isFooterBlurred
                radius="sm"
                className="border-none"
              >
                <Image
                  alt="wedding photo"
                  className="object-cover hover:scale-110 transition-transform"
                  height={200}
                  src={src}
                  width={250}
                />
              </Card>
            ))}
          </div>
        </div>
      </ScrollShadow>
    </div>
  );
}
