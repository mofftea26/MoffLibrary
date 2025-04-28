import { useState } from "react";
import { useThrottle } from "../../hooks/UtilityHooks/useThrottle";

export function ThrottleDemo() {
  const [text, setText] = useState("");
  const throttled = useThrottle(text, 500);

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <p>Throttled: {throttled}</p>
    </div>
  );
}
