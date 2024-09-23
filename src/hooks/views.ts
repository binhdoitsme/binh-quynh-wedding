"use client";
import { useEffect, useState, useRef } from "react";

export const useInView = <T extends HTMLElement | null>(
  threshold: number = 0.5
) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold, // Defines how much of the element should be visible
      }
    );

    const currentElement = ref.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  return { isInView, ref };
};

type ScreenSize = {
  width: number;
  height: number;
  device: "mobile" | "tablet" | "desktop";
};

export const useScreenSize = (): ScreenSize | undefined => {
  const getDeviceType = (width: number): "mobile" | "tablet" | "desktop" => {
    if (width < 768) return "mobile"; // Mobile: < 768px
    if (width < 1024) return "tablet"; // Tablet: 768px - 1023px
    return "desktop"; // Desktop: ≥ 1024px
  };

  const [screenSize, setScreenSize] = useState<ScreenSize>();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setScreenSize({
        width,
        height,
        device: getDeviceType(width),
      });
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};
