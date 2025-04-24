// hooks/useInertiaMotion.ts
import { useEffect } from "react";
import gsap from "gsap";

export const useInertiaMotion = (
  ref: React.RefObject<HTMLElement>,
  { velocity = 500, duration = 2 }: { velocity?: number; duration?: number }
) => {
  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      x: `+=${velocity}`,
      duration,
      ease: "power3.out",
    });
  }, [ref, velocity, duration]);
};

// ✅ Example:
// const boxRef = useRef<HTMLDivElement>(null);
// useInertiaMotion(boxRef, { velocity: 400 });
// return <div ref={boxRef} className="box" />;
