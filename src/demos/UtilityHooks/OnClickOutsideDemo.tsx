import { RefObject, useState, useRef } from "react";
import { useOnClickOutside } from "../../hooks/UtilityHooks/useOnClickOutside";

export function OnClickOutsideDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(true);

  useOnClickOutside(ref as RefObject<HTMLElement>, () => setOpen(false));

  return (
    <div>
      {open ? (
        <div ref={ref} style={{ width: 200, height: 200, background: "pink" }}>
          Click outside to close me!
        </div>
      ) : (
        <button onClick={() => setOpen(true)}>Open Box</button>
      )}
    </div>
  );
}
