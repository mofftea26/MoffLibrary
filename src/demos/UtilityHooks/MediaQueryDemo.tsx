import { useMediaQuery } from "../../hooks/UtilityHooks/useMediaQuery";

export function MediaQueryDemo() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return <h2>{isMobile ? "Mobile View" : "Desktop View"}</h2>;
}
