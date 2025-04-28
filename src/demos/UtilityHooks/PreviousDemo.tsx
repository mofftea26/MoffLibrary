import { useState } from "react";
import { usePrevious } from "../../hooks/UtilityHooks/usePrevious";

export function PreviousDemo() {
  const [count, setCount] = useState(0);
  const previous = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {previous}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}
