// hooks/usePhysics2D.ts
import { useEffect } from "react";
import gsap from "gsap";

type PhysicsProps = {
  velocity: { x: number; y: number };
  gravity?: number;
  friction?: number;
  duration?: number;
};

export const usePhysics2D = (
  ref: React.RefObject<HTMLElement>,
  { velocity, gravity = 500, friction = 0.98 }: PhysicsProps
) => {
  useEffect(() => {
    if (!ref.current) return;
    let posX = 0;
    let posY = 0;
    let vx = velocity.x;
    let vy = velocity.y;

    const update = () => {
      vx *= friction;
      vy += gravity * 0.016;
      posX += vx * 0.016;
      posY += vy * 0.016;

      gsap.set(ref.current, { x: posX, y: posY });
      if (Math.abs(vx) > 0.1 || Math.abs(vy) > 0.1)
        requestAnimationFrame(update);
    };

    update();
  }, [ref, velocity, gravity, friction]);
};

// ✅ Example:
// const ballRef = useRef<HTMLDivElement>(null);
//   usePhysics2D(ballRef as React.RefObject<HTMLElement>, {
//   velocity: { x: 100, y: -200 },
//   gravity: 100,
//   friction: 0.9,
// });
// return <div ref={ballRef} className="ball" />;
