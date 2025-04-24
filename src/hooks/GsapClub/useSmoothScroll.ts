// hooks/useSmoothScroll.ts
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export const useSmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      wheelMultiplier: 1,
      orientation: "vertical",
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
