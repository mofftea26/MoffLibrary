import { useRef, RefObject } from "react";
import { useDraggableInertia } from "../../hooks/GsapClub/useDraggableInertia";

export function DraggableInertiaDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  useDraggableInertia(boxRef as RefObject<HTMLElement>, {
    resistance: 2,
    rotate: false,
    bounds: true,
    disabled: false,
    bounce: 0,
  });

  return (
    <div style={{ height: "100vh", width: "100%", background: "#111" }}>
      <div
        ref={boxRef}
        style={{
          width: "100px",
          height: "100px",
          background: "tomato",
          position: "relative",
        }}
      />
    </div>
  );
}
