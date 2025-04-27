import { useState, useRef, useEffect } from "react";

export function useHover<T extends HTMLElement>() {
  const [isHovered, setHovered] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

    const node = ref.current;
    if (node) {
      node.addEventListener("mouseenter", handleMouseEnter);
      node.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (node) {
        node.removeEventListener("mouseenter", handleMouseEnter);
        node.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return { ref, isHovered };
}

// Example Usage:
// const { ref, isHovered } = useHover<HTMLDivElement>();
// <div ref={ref}>{isHovered ? 'Hovered!' : 'Hover me'}</div>
