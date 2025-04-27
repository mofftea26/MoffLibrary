import { useEffect, useState, useRef } from "react";

export function useThrottle<T>(value: T, limit = 300) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => clearTimeout(handler);
  }, [value, limit]);

  return throttledValue;
}

// Example Usage:
// const throttledScrollPos = useThrottle(scrollY, 100);
// useEffect(() => {
//   updatePosition(throttledScrollPos);
// }, [throttledScrollPos]);
