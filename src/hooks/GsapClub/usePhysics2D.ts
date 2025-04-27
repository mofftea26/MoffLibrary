import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type Velocity = {
  x: number;
  y: number;
};

type Physics2DOptions = {
  velocity: Velocity;
  gravity?: number;
  friction?: number;
  duration?: number; // Optional max lifetime
  rotation?: boolean; // Optional: auto-rotate the element
};

export const usePhysics2D = (
  ref: React.RefObject<HTMLElement>,
  {
    velocity,
    gravity = 500,
    friction = 0.98,
    duration,
    rotation = false,
  }: Physics2DOptions
) => {
  const frame = useRef<number>(0);

  useEffect(() => {
    if (!ref.current) return;

    let posX = parseFloat(gsap.getProperty(ref.current, "x") as string) || 0;
    let posY = parseFloat(gsap.getProperty(ref.current, "y") as string) || 0;
    let angle = 0;
    let vx = velocity.x;
    let vy = velocity.y;
    let elapsed = 0;
    let lastTime = performance.now();

    const element = ref.current;

    const update = (deltaTime: number) => {
      vx *= friction;
      vy += gravity * (deltaTime / 1000);
      posX += vx * (deltaTime / 1000);
      posY += vy * (deltaTime / 1000);
      elapsed += deltaTime;

      if (rotation) {
        angle += vx * 0.5;
        gsap.set(element, { x: posX, y: posY, rotate: angle });
      } else {
        gsap.set(element, { x: posX, y: posY });
      }

      const rect = element.getBoundingClientRect();
      const isOutOfViewport =
        rect.right < 0 ||
        rect.left > window.innerWidth ||
        rect.bottom < 0 ||
        rect.top > window.innerHeight;

      const isMoving = Math.abs(vx) > 0.1 || Math.abs(vy) > 0.1;

      const shouldContinue =
        !isOutOfViewport &&
        isMoving &&
        (!duration || elapsed < duration * 1000);

      if (shouldContinue) {
        frame.current = requestAnimationFrame((timestamp) => {
          const delta = timestamp - lastTime;
          lastTime = timestamp;
          update(delta);
        });
      } else {
        // Destroy the element cleanly when done
        element.remove();
      }
    };

    frame.current = requestAnimationFrame((timestamp) => {
      lastTime = timestamp;
      update(0);
    });

    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [ref, velocity, gravity, friction, duration, rotation]);
};
