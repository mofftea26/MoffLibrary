import { useWindowSize } from "../../hooks/UtilityHooks/useWindowSize";

export function WindowSizeDemo() {
  const { width, height } = useWindowSize();

  return (
    <h2>
      Window: {width}px x {height}px
    </h2>
  );
}
