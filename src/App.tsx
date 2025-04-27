import { useState, useRef, useEffect, RefObject } from "react";
import { useDrawSVG } from "./hooks/GsapClub/useDrawSVG";
import { useSplitText } from "./hooks/GsapClub/useSplitText";
import { useInertiaMotion } from "./hooks/GsapClub/useInertiaMotion";
import { useSmoothScroll } from "./hooks/GsapClub/useSmoothScroll";
import { useScrambleText } from "./hooks/GsapClub/useScrambleText";
import { usePhysics2D } from "./hooks/GsapClub/usePhysics2D";
import { usePhysics2DGroup } from "./hooks/GsapClub/usePhysics2DGroup";
import { useMultipleRefs } from "./hooks/useMultipleRefs";
import gsap from "gsap";
import "./App.css";
import { usePhysics2DController } from "./hooks/GsapClub/usePhysics2DEXplosion";
import { useDraggableInertia } from "./hooks/GsapClub/useDraggableInertia";

type Demo =
  | "Home"
  | "DrawSVG"
  | "SplitText"
  | "InertiaMotion"
  | "SmoothScroll"
  | "ScrambleText"
  | "Physics2D"
  | "Physics2DGroup"
  | "ParticleExplosion"
  | "DraggableInertia";

function App() {
  const [currentDemo, setCurrentDemo] = useState<Demo>("Home");

  return (
    <div style={{ padding: "2rem" }}>
      {currentDemo === "Home" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h1>Choose a Demo</h1>
          <button onClick={() => setCurrentDemo("DrawSVG")}>Draw SVG</button>
          <button onClick={() => setCurrentDemo("SplitText")}>
            Split Text
          </button>
          <button onClick={() => setCurrentDemo("InertiaMotion")}>
            Inertia Motion
          </button>
          <button onClick={() => setCurrentDemo("SmoothScroll")}>
            Smooth Scroll
          </button>
          <button onClick={() => setCurrentDemo("ScrambleText")}>
            Scramble Text
          </button>
          <button onClick={() => setCurrentDemo("Physics2D")}>
            Physics 2D
          </button>
          <button onClick={() => setCurrentDemo("Physics2DGroup")}>
            Physics 2D Group
          </button>
          <button onClick={() => setCurrentDemo("ParticleExplosion")}>
            Particle Explosion 🎆
          </button>
          <button onClick={() => setCurrentDemo("DraggableInertia")}>
            Draggable Inertia
          </button>
          {/* NEW BUTTON */}
        </div>
      )}

      {currentDemo !== "Home" && (
        <button
          style={{ marginBottom: "2rem" }}
          onClick={() => setCurrentDemo("Home")}
        >
          ⬅ Back to Home
        </button>
      )}

      {currentDemo === "DrawSVG" && <DrawSVGDemo />}
      {currentDemo === "SplitText" && <SplitTextDemo />}
      {currentDemo === "InertiaMotion" && <InertiaMotionDemo />}
      {currentDemo === "SmoothScroll" && <SmoothScrollDemo />}
      {currentDemo === "ScrambleText" && <ScrambleTextDemo />}
      {currentDemo === "Physics2D" && <Physics2DDemo />}
      {currentDemo === "Physics2DGroup" && <Physics2DGroupDemo />}
      {currentDemo === "ParticleExplosion" && <ParticleExplosionDemo />}
      {currentDemo === "DraggableInertia" && <DraggableInertiaDemo />}
    </div>
  );
}

// --- Components for each Demo

function DrawSVGDemo() {
  const pathRef = useRef<SVGPathElement>(null);
  useDrawSVG(pathRef as RefObject<SVGPathElement>, 10);

  return (
    <svg width="400" height="400">
      <path
        ref={pathRef}
        d="M10 50 H50 V20 H70 V80 H50 V50 H10 M90 20 V80 H110 V60 H130 V80 H150 V20 H130 V40 H110 V20 H90 M170 20 V80 H210 V60 H190 V20 H170 M230 20 V80 H250 V50 H270 V80 H290 V20 H270 V40 H250 V20 H230 M310 80 V20 H330 V50 H350 V20 H370 V80 H350 V60 H330 V80 H310 M390 80 V20 H410 V60 H430 V20 H450 V80 H430 V40 H410 V80 H390"
        stroke="blue"
        fill="transparent"
        strokeWidth="2"
      />
    </svg>
  );
}

function SplitTextDemo() {
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

function InertiaMotionDemo() {
  const boxRef1 = useRef<HTMLDivElement>(null);
  const boxRef2 = useRef<HTMLDivElement>(null);
  const boxRef3 = useRef<HTMLDivElement>(null);
  useInertiaMotion(boxRef1 as RefObject<HTMLElement>, {
    velocity: 500,
    resistance: 5,
    axis: "x",
  });
  useInertiaMotion(boxRef2 as RefObject<HTMLElement>, {
    velocity: -600,
    resistance: 8,
    axis: "y",
  });
  useInertiaMotion(boxRef3 as RefObject<HTMLElement>, {
    velocity: 400,
    resistance: 5,
    axis: "both",
  });
  return (
    <>
      <div
        ref={boxRef1}
        style={{ width: 100, height: 100, backgroundColor: "blue" }}
      />
      <div
        ref={boxRef2}
        style={{ width: 100, height: 100, backgroundColor: "red" }}
      />
      <div
        ref={boxRef3}
        style={{ width: 100, height: 100, backgroundColor: "green" }}
      />
    </>
  );
}

function SmoothScrollDemo() {
  useSmoothScroll({ smoothWheel: true, wheelMultiplier: 1.2 });

  return (
    <div style={{ height: "300vh" }}>
      <h1>Smooth Scroll Section</h1>
      <section style={{ marginTop: "100vh" }}>Scroll me smoothly!</section>
    </div>
  );
}

function ScrambleTextDemo() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { start: startScramble } = useScrambleText(
    titleRef as RefObject<HTMLElement>,
    {
      finalText: "Scramble This Text",
      speed: 50,
      scrambleChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      revealDelay: 500,
      colorAnimation: true,
      scrambleColor: "#00FF00",
      glitch: true,
      autostart: false,
    }
  );

  useEffect(() => {
    startScramble();
  }, [startScramble]);

  return <h1 ref={titleRef} />;
}

function Physics2DDemo() {
  const ballRef = useRef<HTMLDivElement>(null);
  usePhysics2D(ballRef as RefObject<HTMLElement>, {
    velocity: { x: 300, y: -400 },
    gravity: 800,
    friction: 0.98,
    duration: 5,
    rotation: true,
  });

  return (
    <div
      ref={ballRef}
      style={{
        width: "50px",
        height: "50px",
        backgroundColor: "red",
        borderRadius: "50%",
      }}
    />
  );
}

function Physics2DGroupDemo() {
  const ballRefs = useMultipleRefs<HTMLDivElement>(20);

  usePhysics2DGroup(
    ballRefs.map((ref) => ({
      ref,
      options: {
        velocity: {
          x: Math.random() * 400 - 200,
          y: Math.random() * -400,
        },
        gravity: 700,
        friction: 1,
        duration: 3,
        rotation: true,
      },
    }))
  );

  return (
    <>
      {ballRefs.map((ref, index) => (
        <div
          key={index}
          ref={ref}
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: `hsl(${index * 18}, 100%, 50%)`,
            borderRadius: "50%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </>
  );
}

function ParticleExplosionDemo() {
  const { spawnParticleExplosion } = usePhysics2DController();

  const handleClick = (e: React.MouseEvent) => {
    spawnParticleExplosion(e.clientX, e.clientY - 250, {
      count: 100,
      particle: <div style={{ fontSize: "20px" }}>🎈</div>,
      strength: 500,
      size: 10,
      color: "#00ffff",
      gravity: 300,
      rotation: true,
      duration: 4,
    });
  };

  return (
    <div style={{ height: "100vh", background: "#111" }} onClick={handleClick}>
      <h1 style={{ color: "#fff", textAlign: "center", paddingTop: "2rem" }}>
        Click anywhere to create Confetti 🎉
      </h1>
    </div>
  );
}

function DraggableInertiaDemo() {
  const boxRef = useRef<HTMLDivElement>(null);

  useDraggableInertia(boxRef as RefObject<HTMLElement>, {
    resistance: 2,
    rotate: false,
    bounds: true,
    disabled: false,
    bounce: 0,
  });

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        background: "#111",
      }}
    >
      <div
        ref={boxRef}
        style={{
          width: "100px",
          height: "100px",
          background: "tomato",
          position: "relative", // Important for inner positioning
        }}
      />
    </div>
  );
}
export default App;
