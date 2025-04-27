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
  duration?: number;
  rotation?: boolean;
};

type Physics2DInstance = {
  ref: React.RefObject<HTMLElement | HTMLDivElement | null>;
  options: Physics2DOptions;
};

export const usePhysics2DGroup = (instances: Physics2DInstance[]) => {
  const frames = useRef<Map<HTMLElement, number>>(new Map());

  useEffect(() => {
    const activeAnimations: Map<
      HTMLElement,
      {
        lastTime: number;
        vx: number;
        vy: number;
        posX: number;
        posY: number;
        angle: number;
        elapsed: number;
        gravity: number;
        friction: number;
        duration: number;
        rotation: boolean;
      }
    > = new Map();

    instances.forEach(({ ref, options }) => {
      if (!ref.current) return;

      const element = ref.current;
      const {
        velocity,
        gravity = 500,
        friction = 0.98,
        duration = 0,
        rotation = false,
      } = options;

      activeAnimations.set(element, {
        lastTime: performance.now(),
        vx: velocity.x,
        vy: velocity.y,
        posX: parseFloat(gsap.getProperty(element, "x") as string) || 0,
        posY: parseFloat(gsap.getProperty(element, "y") as string) || 0,
        angle: 0,
        elapsed: 0,
        gravity,
        friction,
        duration,
        rotation,
      });
    });

    const updateAll = (time: number) => {
      activeAnimations.forEach((state, element) => {
        const {
          vx,
          vy,
          posX,
          posY,
          angle,
          elapsed,
          gravity,
          friction,
          duration,
          rotation,
        } = state;
        const deltaTime = time - state.lastTime;

        const newVx = vx * friction;
        const newVy = vy + gravity * (deltaTime / 1000);

        const newPosX = posX + newVx * (deltaTime / 1000);
        const newPosY = posY + newVy * (deltaTime / 1000);
        let newAngle = angle;

        if (rotation) {
          newAngle += newVx * 0.5;
          gsap.set(element, { x: newPosX, y: newPosY, rotate: newAngle });
        } else {
          gsap.set(element, { x: newPosX, y: newPosY });
        }

        const rect = element.getBoundingClientRect();
        const isOutOfViewport =
          rect.right < 0 ||
          rect.left > window.innerWidth ||
          rect.bottom < 0 ||
          rect.top > window.innerHeight;

        const isMoving = Math.abs(newVx) > 0.1 || Math.abs(newVy) > 0.1;
        const newElapsed = elapsed + deltaTime;

        if (
          isOutOfViewport ||
          !isMoving ||
          (duration && newElapsed > duration * 1000)
        ) {
          activeAnimations.delete(element);
          element.remove(); // ✅ remove the particle DOM node
        } else {
          activeAnimations.set(element, {
            lastTime: time,
            vx: newVx,
            vy: newVy,
            posX: newPosX,
            posY: newPosY,
            angle: newAngle,
            elapsed: newElapsed,
            gravity,
            friction,
            duration,
            rotation,
          });
        }
      });

      if (activeAnimations.size > 0) {
        const id = requestAnimationFrame(updateAll);
        frames.current.set(document.body, id);
      }
    };

    const raf = requestAnimationFrame(updateAll);
    frames.current.set(document.body, raf);

    return () => {
      frames.current.forEach((id) => cancelAnimationFrame(id));
      frames.current.clear();
      activeAnimations.clear();
    };
  }, [instances]);
};
