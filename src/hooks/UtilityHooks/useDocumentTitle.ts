import { useEffect, useRef } from "react";

export function useDocumentTitle(title: string, retainOnUnmount = false) {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    const previousTitle = defaultTitle.current;
    document.title = title;
    return () => {
      if (!retainOnUnmount) document.title = previousTitle;
    };
  }, [title, retainOnUnmount]);
}

// Example Usage:
// useDocumentTitle("Dashboard | My App");
