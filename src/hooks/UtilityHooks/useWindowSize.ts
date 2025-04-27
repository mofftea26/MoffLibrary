import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";

export function useWindowSize(debounceDelay = 150) {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () =>
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

  const debouncedHandleResize = useDebounce(handleResize, debounceDelay);

  useEffect(() => {
    window.addEventListener("resize", debouncedHandleResize);
    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, [debouncedHandleResize]);

  return windowSize;
}

// Example Usage
// const { width, height } = useWindowSize();
