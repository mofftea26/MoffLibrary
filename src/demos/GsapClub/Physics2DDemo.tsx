import { useRef, RefObject } from "react";
import { usePhysics2D } from "../../hooks/GsapClub/usePhysics2D";

export function Physics2DDemo() {
  const ballRef = useRef<HTMLDivElement>(null);
  usePhysics2D(ballRef as RefObject<HTMLElement>, {
    velocity: { x: 300, y: -400 },
    gravity: 800,
    friction: 0.98,
    duration: 5,
    rotation: true,
  });

  return (
    <div
      ref={ballRef}
      style={{
        width: "50px",
        height: "50px",
        backgroundColor: "red",
        borderRadius: "50%",
      }}
    />
  );
}
