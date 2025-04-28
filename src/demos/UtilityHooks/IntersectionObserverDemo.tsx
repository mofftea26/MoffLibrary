import { RefObject, useRef } from "react";
import { useIntersectionObserver } from "../../hooks/UtilityHooks/useIntersectionObserver";

export function IntersectionObserverDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersectionObserver(ref as RefObject<Element>);

  return (
    <div style={{ marginTop: "200vh" }}>
      <div
        ref={ref}
        style={{ height: 100, background: visible ? "green" : "red" }}
      >
        {visible ? "Visible!" : "Not Visible"}
      </div>
    </div>
  );
}
