import { useCallback, useEffect, useRef } from "react";

type UseScrambleTextOptions = {
  finalText: string;
  speed?: number; // milliseconds between each letter lock
  scrambleChars?: string;
  revealDelay?: number;
  onComplete?: () => void;
  autostart?: boolean;
  loop?: boolean;
  glitch?: boolean;
  colorAnimation?: boolean;
  scrambleColor?: string; // Color used while scrambling
};

export const useScrambleText = (
  ref: React.RefObject<HTMLElement>,
  options: UseScrambleTextOptions
) => {
  const {
    finalText,
    speed = 50,
    scrambleChars,
    revealDelay = 0,
    onComplete,
    autostart = false,
    loop = false,
    glitch = false,
    colorAnimation = false,
    scrambleColor = "#ff4c4c",
  } = options;

  const interval = useRef<number>(0);
  const timeout = useRef<number>(0);
  const originalColor = useRef<string>("");

  const start = useCallback(() => {
    if (!ref.current || !finalText) return;

    const element = ref.current;
    const chars =
      scrambleChars ??
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const originalText = finalText.split("");
    const scrambledText = [...originalText];

    let revealedCount = 0;
    originalColor.current = getComputedStyle(element).color;

    const scramble = () => {
      for (let i = revealedCount; i < scrambledText.length; i++) {
        scrambledText[i] = chars[Math.floor(Math.random() * chars.length)];
      }
      if (colorAnimation) {
        element.style.color = scrambleColor;
      }
      element.innerText = scrambledText.join("");
    };

    const revealNext = () => {
      if (revealedCount < originalText.length) {
        if (glitch && Math.random() < 0.2) {
          // 20% chance to glitch a letter again
          scrambledText[revealedCount - 1] =
            chars[Math.floor(Math.random() * chars.length)];
        } else {
          scrambledText[revealedCount] = originalText[revealedCount];
          revealedCount++;
        }
        scramble();
      } else {
        if (loop) {
          revealedCount = 0;
          scramble();
        } else {
          clearInterval(interval.current);
          element.innerText = finalText;
          element.style.color = originalColor.current;
          onComplete?.();
        }
      }
    };

    const startScrambling = () => {
      scramble();
      interval.current = window.setInterval(revealNext, speed);
    };

    timeout.current = window.setTimeout(startScrambling, revealDelay);
  }, [
    ref,
    finalText,
    speed,
    scrambleChars,
    revealDelay,
    onComplete,
    loop,
    glitch,
    colorAnimation,
    scrambleColor,
  ]);

  useEffect(() => {
    if (autostart) {
      start();
    }

    return () => {
      clearInterval(interval.current);
      clearTimeout(timeout.current);
      if (ref.current && colorAnimation) {
        ref.current.style.color = originalColor.current;
      }
    };
  }, [start, autostart, colorAnimation, ref]);

  return { start };
};

// ✅ Example:
// const textRef = useRef<HTMLSpanElement>(null);
// const { start: startScramble } = useScrambleText(
//   textRef as React.RefObject<HTMLElement>,
//   {
//     finalText: "Welcome to My Portfolio",
//     speed: 60,
//     scrambleChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
//     revealDelay: 300,
//     autostart: false,
//     glitch: false,
//     colorAnimation: true,
//     scrambleColor: "#00FF00",
//     onComplete: () => console.log("Scramble finished!"),
//   }
// );
// return <span ref={textRef}></span>;
