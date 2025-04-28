import { useRef, useEffect, RefObject } from "react";
import { useScrambleText } from "../../hooks/GsapClub/useScrambleText";

export function ScrambleTextDemo() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { start } = useScrambleText(titleRef as RefObject<HTMLElement>, {
    finalText: "Scramble This Text",
    speed: 50,
    scrambleChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    revealDelay: 500,
    colorAnimation: true,
    scrambleColor: "#00FF00",
    glitch: true,
    autostart: false,
  });

  useEffect(() => {
    start();
  }, [start]);

  return <h1 ref={titleRef} />;
}
