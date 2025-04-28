import { useState } from "react";
import { useEventListener } from "../../hooks/UtilityHooks/useEventListener";

export function EventListenerDemo() {
  const [width, setWidth] = useState(window.innerWidth);
  useEventListener("resize", () => setWidth(window.innerWidth));

  return <h2>Window Width: {width}px</h2>;
}
