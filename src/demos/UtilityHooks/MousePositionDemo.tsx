import { RefObject, useRef } from "react";
import { useMousePosition } from "../../hooks/UtilityHooks/useMousePosition";

export function MousePositionDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const { x, y } = useMousePosition(boxRef as RefObject<HTMLElement>);

  return (
    <div
      ref={boxRef}
      style={{
        width: 300,
        height: 300,
        background: "#ddd",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", top: y, left: x }}>🎯</div>
      <p>
        X: {x.toFixed(0)}, Y: {y.toFixed(0)}
      </p>
    </div>
  );
}
