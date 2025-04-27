import { useRef, useMemo } from "react";

export const useMultipleRefs = <T>(count: number) => {
  // Create a single ref to store all the refs
  const refsArray = useRef<React.RefObject<T | null>[]>([]);

  // Use useMemo to create the refs only once
  useMemo(() => {
    // Clear existing refs
    refsArray.current = [];

    // Create new refs
    for (let i = 0; i < count; i++) {
      refsArray.current.push({ current: null });
    }
  }, [count]);

  return refsArray.current;
};
