import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type UseDraggableInertiaOptions = {
  resistance?: number;
  rotate?: boolean;
  disabled?: boolean;
  bounds?: boolean;
  bounce?: number; // 0 to 1 strength
};

export const useDraggableInertia = (
  ref: React.RefObject<HTMLElement>,
  {
    resistance = 10,
    rotate = false,
    disabled = false,
    bounds = true,
    bounce = 0.5,
  }: UseDraggableInertiaOptions = {}
) => {
  const frame = useRef<number>(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const vx = useRef(0);
  const vy = useRef(0);
  const angle = useRef(0);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    if (!ref.current || disabled) return;

    const element = ref.current;
    const parent = element.parentElement!;
    const parentRect = parent.getBoundingClientRect();
    const width = element.offsetWidth;
    const height = element.offsetHeight;

    let posX = parseFloat(gsap.getProperty(element, "x") as string) || 0;
    let posY = parseFloat(gsap.getProperty(element, "y") as string) || 0;

    const minX = 0;
    const minY = 0;
    const maxX = parentRect.width - width;
    const maxY = parentRect.height - height;

    const getClientX = (e: MouseEvent | TouchEvent) =>
      "touches" in e ? e.touches[0].clientX : e.clientX;
    const getClientY = (e: MouseEvent | TouchEvent) =>
      "touches" in e ? e.touches[0].clientY : e.clientY;

    const onStart = (e: MouseEvent | TouchEvent) => {
      isDragging.current = true;
      lastX.current = getClientX(e);
      lastY.current = getClientY(e);
      lastTime.current = performance.now();
      cancelAnimationFrame(frame.current);
    };

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return;

      const currentX = getClientX(e);
      const currentY = getClientY(e);
      const dx = currentX - lastX.current;
      const dy = currentY - lastY.current;
      const now = performance.now();
      const dt = (now - lastTime.current) / 1000;

      vx.current = dx / dt;
      vy.current = dy / dt;

      posX += dx;
      posY += dy;

      if (bounds) {
        posX = Math.min(Math.max(posX, minX), maxX);
        posY = Math.min(Math.max(posY, minY), maxY);
      }

      if (rotate) {
        angle.current += vx.current * 0.02;
        gsap.set(element, { x: posX, y: posY, rotate: angle.current });
      } else {
        gsap.set(element, { x: posX, y: posY });
      }

      lastX.current = currentX;
      lastY.current = currentY;
      lastTime.current = now;
    };

    const onEnd = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      startInertia();
    };

    const startInertia = () => {
      const inertiaUpdate = (timestamp: number) => {
        const now = timestamp;
        const dt = (now - lastTime.current) / 1000;
        lastTime.current = now;

        const decay = 1 - resistance * dt;
        vx.current *= decay;
        vy.current *= decay;

        posX += vx.current * dt;
        posY += vy.current * dt;

        // Bounce when hitting edges
        if (bounds) {
          if (posX < minX) {
            posX = minX;
            vx.current = -vx.current * bounce;
          }
          if (posX > maxX) {
            posX = maxX;
            vx.current = -vx.current * bounce;
          }
          if (posY < minY) {
            posY = minY;
            vy.current = -vy.current * bounce;
          }
          if (posY > maxY) {
            posY = maxY;
            vy.current = -vy.current * bounce;
          }
        }

        if (rotate) {
          angle.current += vx.current * 0.02;
          gsap.set(element, { x: posX, y: posY, rotate: angle.current });
        } else {
          gsap.set(element, { x: posX, y: posY });
        }

        const speed = Math.sqrt(
          vx.current * vx.current + vy.current * vy.current
        );
        const stillMoving = speed > 1;

        if (stillMoving) {
          frame.current = requestAnimationFrame(inertiaUpdate);
        }
      };

      frame.current = requestAnimationFrame(inertiaUpdate);
    };

    element.addEventListener("mousedown", onStart);
    element.addEventListener("touchstart", onStart, { passive: false });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchend", onEnd);

    return () => {
      element.removeEventListener("mousedown", onStart);
      element.removeEventListener("touchstart", onStart);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchend", onEnd);
      cancelAnimationFrame(frame.current);
    };
  }, [ref, resistance, rotate, disabled, bounds, bounce]);
};
