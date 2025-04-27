import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("LocalStorage error: ", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}

// Example Usage
// const [theme, setTheme] = useLocalStorage("theme", "light");
