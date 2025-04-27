import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { createPortal } from "react-dom";

type Velocity = { x: number; y: number };

type Physics2DOptions = {
  velocity: Velocity;
  gravity?: number;
  friction?: number;
  duration?: number;
  rotation?: boolean;
};

type ExplosionOptions = {
  count?: number;
  strength?: number;
  gravity?: number;
  friction?: number;
  duration?: number;
  rotation?: boolean;
  size?: number;
  color?: string;
  particle?: React.ReactNode;
};

type AnimationState = {
  vx: number;
  vy: number;
  posX: number;
  posY: number;
  angle: number;
  gravity: number;
  friction: number;
  lastTime: number;
  elapsed: number;
  duration?: number;
  rotation: boolean;
};

export const usePhysics2DController = () => {
  const activeAnimations = useRef<Map<HTMLElement, AnimationState>>(new Map());
  const frameId = useRef<number | null>(null);

  const startAnimationLoop = useCallback(() => {
    if (frameId.current !== null) return;

    const updateAll = (time: number) => {
      activeAnimations.current.forEach((state, element) => {
        const deltaTime = time - state.lastTime;

        state.vx *= state.friction;
        state.vy += state.gravity * (deltaTime / 1000);

        state.posX += state.vx * (deltaTime / 1000);
        state.posY += state.vy * (deltaTime / 1000);
        state.elapsed += deltaTime;

        if (state.rotation) {
          state.angle += state.vx * 0.5;
          gsap.set(element, {
            x: state.posX,
            y: state.posY,
            rotate: state.angle,
          });
        } else {
          gsap.set(element, { x: state.posX, y: state.posY });
        }

        const rect = element.getBoundingClientRect();
        const isOutOfViewport =
          rect.right < 0 ||
          rect.left > window.innerWidth ||
          rect.bottom < 0 ||
          rect.top > window.innerHeight;

        const isMoving = Math.abs(state.vx) > 0.1 || Math.abs(state.vy) > 0.1;

        if (
          !isMoving ||
          (state.duration && state.elapsed > state.duration * 1000) ||
          isOutOfViewport
        ) {
          activeAnimations.current.delete(element);
          element.remove();
        } else {
          state.lastTime = time;
        }
      });

      if (activeAnimations.current.size > 0) {
        frameId.current = requestAnimationFrame(updateAll);
      } else {
        frameId.current = null;
      }
    };

    frameId.current = requestAnimationFrame(updateAll);
  }, []);

  const spawn = useCallback(
    (
      ref: React.RefObject<HTMLElement>,
      options: Physics2DOptions,
      startX: number,
      startY: number
    ) => {
      if (!ref.current) return;

      const element = ref.current;
      const {
        velocity,
        gravity = 500,
        friction = 0.98,
        duration,
        rotation = false,
      } = options;

      activeAnimations.current.set(element, {
        lastTime: performance.now(),
        vx: velocity.x,
        vy: velocity.y,
        posX: startX,
        posY: startY,
        angle: 0,
        elapsed: 0,
        gravity,
        friction,
        duration,
        rotation,
      });

      startAnimationLoop();
    },
    [startAnimationLoop]
  );

  const spawnParticleExplosion = useCallback(
    (x: number, y: number, options?: ExplosionOptions) => {
      const {
        count = 20,
        strength = 400,
        gravity = 300,
        friction = 0.98,
        duration = 3,
        rotation = true,
        size = 10,
        color = "#ffcc00",
        particle,
      } = options || {};

      for (let i = 0; i < count; i++) {
        const container = document.createElement("div");
        container.style.position = "absolute";
        container.style.width = `${size}px`;
        container.style.height = `${size}px`;
        container.style.pointerEvents = "none";
        container.style.overflow = "visible";

        if (!particle) {
          container.style.borderRadius = "50%";
          container.style.backgroundColor = color;
        }

        document.body.appendChild(container);

        const ref = { current: container } as React.RefObject<HTMLElement>;

        gsap.set(container, {
          x: x - size / 2,
          y: y - size / 2,
          transformOrigin: "50% 50%",
        });

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * strength;

        spawn(
          ref,
          {
            velocity: {
              x: Math.cos(angle) * speed,
              y: Math.sin(angle) * speed,
            },
            gravity,
            friction,
            duration,
            rotation,
          },
          x - size / 2,
          y - size / 2
        );

        if (particle) {
          const mount = document.createElement("div");
          document.body.appendChild(mount);

          import("react-dom/client").then(({ createRoot }) => {
            const root = createRoot(mount);
            root.render(createPortal(particle, container));
            setTimeout(() => {
              root.unmount();
              mount.remove();
            }, duration * 1000);
          });
        }

        setTimeout(() => {
          container.remove();
        }, duration * 1000);
      }
    },
    [spawn]
  );

  useEffect(() => {
    return () => {
      if (frameId.current !== null) {
        cancelAnimationFrame(frameId.current);
      }
      activeAnimations.current.clear();
    };
  }, []);

  return { spawn, spawnParticleExplosion };
};
