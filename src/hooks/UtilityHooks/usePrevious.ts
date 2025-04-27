import { useEffect, useRef } from "react";

// 1. usePrevious
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>(undefined as T);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

// Example Usage
// const prevCount = usePrevious(count);
// console.log(`Previous: ${prevCount}, Current: ${count}`);
