import { RefObject, useRef } from "react";
import { useInertiaMotion } from "../../hooks/GsapClub/useInertiaMotion";

export function InertiaMotionDemo() {
  const boxRef1 = useRef<HTMLDivElement>(null);
  const boxRef2 = useRef<HTMLDivElement>(null);
  const boxRef3 = useRef<HTMLDivElement>(null);

  useInertiaMotion(boxRef1 as RefObject<HTMLElement>, {
    velocity: 500,
    resistance: 5,
    axis: "x",
  });
  useInertiaMotion(boxRef2 as RefObject<HTMLElement>, {
    velocity: -600,
    resistance: 8,
    axis: "y",
  });
  return (
    <>
      <div
        style={{ width: 100, height: 100, background: "blue" }}
        ref={boxRef1}
      />
      <div
        style={{ width: 100, height: 100, background: "red" }}
        ref={boxRef2}
      />
      <div
        style={{ width: 100, height: 100, background: "green" }}
        ref={boxRef3}
      />
    </>
  );
}
