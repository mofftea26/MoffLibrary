import { useEffect } from "react";
import { useSplitText } from "../../hooks/GsapClub/useSplitText";
import gsap from "gsap";

export function SplitTextDemo() {
  const { items, refs } = useSplitText("Hello World Split", "chars");

  useEffect(() => {
    gsap.fromTo(
      refs.current,
      { y: gsap.utils.wrap([100, -100]), opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        color: gsap.utils.wrap(["red", "blue", "white"]),
        ease: "back.out(1.7)",
      }
    );
  }, []);

  return (
    <span style={{ display: "inline-block", overflow: "hidden" }}>
      {items.map(({ id, value }, i) => (
        <span
          key={id}
          style={{ display: "inline-block", whiteSpace: "pre" }}
          ref={(el) => {
            if (el) refs.current[i] = el;
          }}
        >
          {value}
        </span>
      ))}
    </span>
  );
}
