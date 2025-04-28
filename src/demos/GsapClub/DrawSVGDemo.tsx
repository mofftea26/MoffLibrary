import { useRef, RefObject } from "react";
import { useDrawSVG } from "../../hooks/GsapClub/useDrawSVG";

export function DrawSVGDemo() {
  const pathRef = useRef<SVGPathElement>(null);
  useDrawSVG(pathRef as RefObject<SVGPathElement>, 10);

  return (
    <svg width="400" height="400">
      <path
        ref={pathRef}
        d="M10 50 H50 V20 H70 V80 H50 V50 H10 M90 20 V80 H110 V60 H130 V80 H150 V20 H130 V40 H110 V20 H90..."
        stroke="blue"
        fill="transparent"
        strokeWidth="2"
      />
    </svg>
  );
}
