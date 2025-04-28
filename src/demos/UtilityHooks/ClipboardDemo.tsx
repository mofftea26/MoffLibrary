import { useClipboard } from "../../hooks/UtilityHooks/useClipboard";

export const ClipboardDemo = () => {
  const { copied, copy } = useClipboard();
  return (
    <button onClick={() => copy("Copied Text!")}>
      {copied ? "Copied!" : "Copy"}
    </button>
  );
};
