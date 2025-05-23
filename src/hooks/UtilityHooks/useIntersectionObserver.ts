import { useEffect, useState } from "react";

export function useIntersectionObserver(
  ref: React.RefObject<Element>,
  options?: IntersectionObserverInit
) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);

  return isIntersecting;
}

// Example Usage
// const ref = useRef<HTMLDivElement>(null);
// const visible = useIntersectionObserver(ref);
