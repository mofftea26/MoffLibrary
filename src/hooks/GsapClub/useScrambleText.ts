// hooks/useScrambleText.ts
import { useEffect } from "react";

export const useScrambleText = (
  ref: React.RefObject<HTMLElement>,
  finalText: string,
  speed = 50
) => {
  useEffect(() => {
    if (!ref.current || !finalText) return;
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let iterations = 0;

    const interval = setInterval(() => {
      ref.current!.innerText = finalText
        .split("")
        .map((char, i) => {
          if (i < iterations) return finalText[i];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      if (iterations >= finalText.length) clearInterval(interval);
      iterations += 1 / 2;
    }, speed);

    return () => clearInterval(interval);
  }, [ref, finalText, speed]);
};

// ✅ Example:
// const textRef = useRef<HTMLSpanElement>(null);
// useScrambleText(textRef as React.RefObject<HTMLElement>, "Hello World");
// return <span ref={textRef}></span>;
