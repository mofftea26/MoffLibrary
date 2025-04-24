import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import { useDrawSVG } from "./hooks/GsapClub/useDrawSVG";
import { useSplitText } from "./hooks/GsapClub/useSplitText";
import viteLogo from "/vite.svg";
import { useInertiaMotion } from "./hooks/GsapClub/useInertiaMotion";
import { useSmoothScroll } from "./hooks/GsapClub/useSmoothScroll";

function App() {
  const [count, setCount] = useState(0);
  const { items, refs } = useSplitText("Hello World", "chars");
  const pathRef = useRef<SVGPathElement>(null);
  useDrawSVG(pathRef as React.RefObject<SVGPathElement>, 2);
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
  const boxRef = useRef<HTMLDivElement>(null);
  useInertiaMotion(boxRef as React.RefObject<HTMLElement>, {
    velocity: 50,
  });
  useSmoothScroll();
  return (
    <div
      style={{
        height: "300vh",
        display: "flex",
        flexDirection: "column",
        gap: "10rem",
      }}
    >
      <section className="hero">Hero Content</section>
      <div
        ref={boxRef}
        style={{ width: "100px", height: "100px", backgroundColor: "red" }}
      />
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
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
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <section className="about">About</section>
    </div>
  );
}

export default App;
