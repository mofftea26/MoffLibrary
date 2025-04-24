// hooks/useMorphSVG.ts
import { useEffect } from "react";
import { interpolate } from "flubber";
import gsap from "gsap";

export const useMorphSVG = (
  ref: React.RefObject<SVGPathElement>,
  fromPath: string,
  toPath: string,
  duration = 1
) => {
  useEffect(() => {
    if (!ref.current) return;
    const morph = interpolate(fromPath, toPath);
    gsap.to(
      { progress: 0 },
      {
        progress: 1,
        duration,
        ease: "power1.inOut",
        onUpdate() {
          ref.current!.setAttribute("d", morph(this.progress));
        },
      }
    );
  }, [ref, fromPath, toPath, duration]);
};

// ✅ Example:
// const morphRef = useRef<SVGPathElement>(null);
// useMorphSVG(morphRef, "M0,0 C100,100 200,0 300,100", "M0,100 C100,0 200,100 300,0", 2);
// return <path ref={morphRef} fill="none" stroke="red" />;
