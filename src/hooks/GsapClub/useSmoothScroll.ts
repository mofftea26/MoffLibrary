// hooks/useSmoothScroll.ts
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

type SmoothScrollProps = {
  smoothWheel?: boolean;
  wheelMultiplier?: number;
  orientation?: "vertical" | "horizontal";
};

export const useSmoothScroll = (props?: SmoothScrollProps) => {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: props?.smoothWheel,
      wheelMultiplier: props?.wheelMultiplier,
      orientation: props?.orientation,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);
};
// ✅ Example:
// useSmoothScroll();
// return (
//   <div>
//     <section className="hero">Hero Content</section>
//     <section className="about">About</section>
//   </div>
// );
