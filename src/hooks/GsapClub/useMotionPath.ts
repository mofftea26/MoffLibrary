// hooks/useMotionPath.ts
import { useEffect } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

export const useMotionPath = (
  ref: React.RefObject<HTMLElement>,
  pathSelector: string,
  duration = 2
) => {
  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      duration,
      motionPath: {
        path: pathSelector,
        align: pathSelector,
        autoRotate: true,
        alignOrigin: [0.5, 0.5],
      },
      ease: "power1.inOut",
    });
  }, [ref, pathSelector, duration]);
};

// ✅ Example:
// const boxRef = useRef<HTMLDivElement>(null);
//  useMotionPath(boxRef as React.RefObject<HTMLElement>, "#svgPath", 2);
// return (
//    <>
// <svg>
// <path id="svgPath" d="M0,0 C100,100 200,0 300,100" />
// </svg>
// <div
// ref={boxRef}
// style={{ width: "100px", height: "100px", backgroundColor: "red" }}
// />
// </>
// );
