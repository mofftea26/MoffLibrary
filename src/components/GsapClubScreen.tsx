import { FC } from "react";
import { Demo } from "../App";

interface GsapClubScreenProps {
  setDemo: (demo: Demo) => void;
}

export const GsapClubScreen: FC<GsapClubScreenProps> = ({ setDemo }) => {
  return (
    <>
      <h2>GSAP Club Demos</h2>
      <div className="button-grid">
        <button onClick={() => setDemo("DrawSVG")}>Draw SVG</button>
        <button onClick={() => setDemo("SplitText")}>Split Text</button>
        <button onClick={() => setDemo("InertiaMotion")}>Inertia Motion</button>
        <button onClick={() => setDemo("SmoothScroll")}>Smooth Scroll</button>
        <button onClick={() => setDemo("ScrambleText")}>Scramble Text</button>
        <button onClick={() => setDemo("Physics2D")}>Physics 2D</button>
        <button onClick={() => setDemo("Physics2DGroup")}>
          Physics 2D Group
        </button>
        <button onClick={() => setDemo("ParticleExplosion")}>
          Particle Explosion 🎆
        </button>
        <button onClick={() => setDemo("DraggableInertia")}>
          Draggable Inertia
        </button>
      </div>
    </>
  );
};
