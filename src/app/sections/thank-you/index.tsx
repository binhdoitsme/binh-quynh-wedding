import { useAnimate, useInView } from "framer-motion";
import { Imperial_Script } from "next/font/google";
import { useCallback, useEffect } from "react";

const scriptFont = Imperial_Script({
  weight: "400",
  subsets: ["vietnamese"],
  display: "swap",
});

const baseUrl = process.env["NEXT_PUBLIC_SUPABASE_PUBLIC_URL"] ?? "";
const baseFolder = `https://${baseUrl}/storage/v1/object/public/wedding-images/public`;

export function ThankYou() {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { amount: 0.25 });

  const enter = useCallback(async () => {
    await animate("img", { opacity: 0 }, { duration: 0 });
    await Promise.all([
      animate(
        scope.current,
        { background: "#fffdf9" },
        { ease: "easeInOut", duration: 0.5 }
      ),
      animate(
        "h1,p",
        { opacity: 1, y: 0, color: "#121212" },
        { ease: "easeInOut", duration: 0.5 }
      ),
    ]);
    await Promise.all([
      animate(
        "img",
        { opacity: 0.4 },
        { ease: "easeInOut", duration: 1, delay: 0.5 }
      ),
      animate(
        scope.current,
        { background: "#000000" },
        { ease: "easeInOut", duration: 1, delay: 0.5 }
      ),
      animate(
        "h1,p",
        { color: "#EDEDED" },
        { ease: "easeInOut", duration: 1, delay: 0.5 }
      ),
    ]);
  }, []);

  const exit = useCallback(async () => {
    await Promise.all([
      animate(
        "h1,p",
        { opacity: 0, y: 100 },
        { ease: "easeInOut", duration: 1 }
      ),
      animate(
        scope.current,
        { background: "#fffdf9" },
        { ease: "easeInOut", duration: 0.5 }
      ),
      animate("img", { opacity: 0 }, { ease: "easeInOut", duration: 0.5 }),
    ]);
  }, []);

  useEffect(() => {
    if (isInView) {
      enter();
    } else {
      exit();
    }
  }, [isInView, enter, exit]);

  return (
    <div
      ref={scope}
      className="w-full h-full overflow-hidden absolute top-0 left-0 border-y border-collapse flex flex-col justify-center items-center py-4 bg-[#fffdf9]"
    >
      <img
        className="absolute md:-top-[10rem] object-cover object-top h-full md:h-auto md:w-full opacity-0"
        src={`${baseFolder}/VHU06801.jpg`}
        alt="..."
      />
      <h1 className={`${scriptFont.className} text-[5rem] z-10 text-[#EDEDED]`}>
        Thank you!
      </h1>
      <p className="z-10 text-[#EDEDED] text-center font-medium tracking-tighter">
        Sự hiện diện của Quý vị là niềm vinh hạnh
        <br />
        cho gia đình chúng tôi.
        <br />
        Chân thành cảm ơn!
      </p>
    </div>
  );
}
