import { useState } from "react";
import { useDebounce } from "../../hooks/UtilityHooks/useDebounce";

export function DebounceDemo() {
  const [text, setText] = useState("");
  const debounced = useDebounce(text, 500);

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <p>Debounced: {debounced}</p>
    </div>
  );
}
