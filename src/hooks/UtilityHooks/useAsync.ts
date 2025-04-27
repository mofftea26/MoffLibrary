import { useCallback, useEffect, useState } from "react";
export function useAsync<T>(
  asyncFunction: (signal?: AbortSignal) => Promise<T>,
  immediate = true
) {
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(() => {
    const controller = new AbortController();
    setStatus("pending");
    asyncFunction(controller.signal)
      .then((response) => {
        setData(response);
        setStatus("success");
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err);
          setStatus("error");
        }
      });
    return () => controller.abort();
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      const cancel = execute();
      return cancel;
    }
  }, [execute, immediate]);

  return { execute, status, data, error };
}

// Example Usage
// const { execute, status, data, error } = useAsync(fetchPosts);
