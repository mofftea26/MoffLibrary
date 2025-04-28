import { useEffect, useRef, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
}

interface UseMousePositionOptions {
  shouldResetOnLeave?: boolean;
  smooth?: boolean; // Use interpolation (lerp)
  lerpFactor?: number; // 0.1 for slow, 0.5 for faster smoothing
}

export function useMousePosition(
  ref: React.RefObject<HTMLElement>,
  options: UseMousePositionOptions = {}
) {
  const {
    shouldResetOnLeave = false,
    smooth = false,
    lerpFactor = 0.1,
  } = options;

  const [targetPosition, setTargetPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMove = (clientX: number, clientY: number) => {
      const rect = element.getBoundingClientRect();

      let x = clientX - rect.left;
      let y = clientY - rect.top;

      // Clamp inside element bounds
      x = Math.max(0, Math.min(x, rect.width));
      y = Math.max(0, Math.min(y, rect.height));

      setTargetPosition({ x, y });
    };

    const handleMouseMove = (event: MouseEvent) => {
      handleMove(event.clientX, event.clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        handleMove(event.touches[0].clientX, event.touches[0].clientY);
      }
    };

    const handleLeave = () => {
      if (shouldResetOnLeave) {
        setTargetPosition({ x: 0, y: 0 });
      }
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("touchmove", handleTouchMove);
    element.addEventListener("mouseleave", handleLeave);
    element.addEventListener("touchend", handleLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("mouseleave", handleLeave);
      element.removeEventListener("touchend", handleLeave);
    };
  }, [ref, shouldResetOnLeave]);

  useEffect(() => {
    if (!smooth) {
      setPosition(targetPosition);
      return;
    }

    const animate = () => {
      setPosition((prev) => ({
        x: prev.x + (targetPosition.x - prev.x) * lerpFactor,
        y: prev.y + (targetPosition.y - prev.y) * lerpFactor,
      }));
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [smooth, targetPosition, lerpFactor]);

  return position;
}

// Example Usage:
//
// const boxRef = useRef<HTMLDivElement>(null);
// const { x, y } = useMousePosition(boxRef);
//
// return (
//   <div ref={boxRef} style={{ width: 400, height: 400, background: '#eee' }}>
//     <p>Mouse X: {x.toFixed(0)} px</p>
//     <p>Mouse Y: {y.toFixed(0)} px</p>
//   </div>
// );
