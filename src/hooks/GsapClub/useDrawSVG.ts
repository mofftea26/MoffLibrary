import { useEffect } from "react";
import gsap from "gsap";

export const useDrawSVG = (
  ref: React.RefObject<SVGPathElement>,
  duration = 1
) => {
  useEffect(() => {
    if (!ref.current) return;
    const length = ref.current.getTotalLength();
    gsap.set(ref.current, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });
    gsap.to(ref.current, { strokeDashoffset: 0, duration, ease: "power1.out" });
  }, [ref, duration]);
};

// ✅ Example:
// const pathRef = useRef<SVGPathElement>(null);
// useDrawSVG(pathRef as React.RefObject<SVGPathElement>, 2);

// <svg width="200" height="200" viewBox="0 0 200 200">
// <path
//   ref={pathRef}
//   d="M20,20 L180,20 L180,180 L20,180 Z"
//   stroke="black"
//   fill="none"
// />
