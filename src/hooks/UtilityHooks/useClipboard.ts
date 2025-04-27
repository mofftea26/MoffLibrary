import { useState } from "react";

export function useClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return { copied, copy };
}

// Example Usage:
// const { copied, copy } = useClipboard();
// <button onClick={() => copy('Text to copy')}>
//   {copied ? 'Copied!' : 'Copy'}
// </button>
