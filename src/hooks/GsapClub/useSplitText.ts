// hooks/useSplitTextWithRefs.ts
import React from "react";
import { useMemo, useRef } from "react";

export const useSplitText = (
  text: string,
  splitBy: "chars" | "words" = "chars"
) => {
  const refs = useRef<HTMLSpanElement[]>([]);

  const items = useMemo(() => {
    refs.current = []; // reset refs
    const split = splitBy === "words" ? text.split(" ") : text.split("");
    return split.map((value, i) => {
      const ref = React.createRef<HTMLSpanElement>();
      refs.current.push(ref.current!);
      return { id: i, value: value + (splitBy === "words" ? " " : ""), ref };
    });
  }, [text, splitBy]);

  return { items, refs };
};
