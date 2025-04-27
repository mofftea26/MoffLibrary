import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type UseInertiaMotionOptions = {
  velocity?: number;
  resistance?: number;
  axis?: "x" | "y" | "both";
};

export const useInertiaMotion = (
  ref: React.RefObject<HTMLElement>,
  { velocity = 500, resistance = 10, axis = "x" }: UseInertiaMotionOptions
) => {
  const frame = useRef<number>(0);

  useEffect(() => {
    if (!ref.current) return;

    let posX = parseFloat(gsap.getProperty(ref.current, "x") as string) || 0;
    let posY = parseFloat(gsap.getProperty(ref.current, "y") as string) || 0;
    let vx = axis === "x" ? velocity : axis === "both" ? velocity : 0;
    let vy = axis === "y" ? velocity : axis === "both" ? velocity : 0;
    let lastTime = performance.now();

    const element = ref.current;

    const update = (deltaTime: number) => {
      const dt = deltaTime / 1000; // convert to seconds

      // Decrease velocity based on resistance (friction)
      const decay = 1 - resistance * dt;
      vx *= decay;
      vy *= decay;

      // Move position by velocity
      posX += vx * dt;
      posY += vy * dt;

      if (axis === "x") {
        gsap.set(element, { x: posX });
      } else if (axis === "y") {
        gsap.set(element, { y: posY });
      } else {
        gsap.set(element, { x: posX, y: posY });
      }

      const speed = Math.sqrt(vx * vx + vy * vy);
      const stillMoving = speed > 1; // threshold: when to stop (~1 px/sec)

      if (stillMoving) {
        frame.current = requestAnimationFrame((timestamp) => {
          const delta = timestamp - lastTime;
          lastTime = timestamp;
          update(delta);
        });
      }
    };

    frame.current = requestAnimationFrame((timestamp) => {
      lastTime = timestamp;
      update(0);
    });

    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [ref, velocity, resistance, axis]);
};
