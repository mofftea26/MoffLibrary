import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number, immediate = false): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (immediate && debouncedValue === value) return;

    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay, immediate, debouncedValue]);

  return debouncedValue;
}

// Example Usage
// const debouncedTerm = useDebounce(searchTerm, 500);
// useEffect(() => {
//   fetchResults(debouncedTerm);
// }, [debouncedTerm]);
