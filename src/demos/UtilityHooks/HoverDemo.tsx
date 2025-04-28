import { useHover } from "../../hooks/UtilityHooks/useHover";

export function HoverDemo() {
  const { ref, isHovered } = useHover<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{
        width: 200,
        height: 200,
        background: isHovered ? "lime" : "gray",
      }}
    >
      {isHovered ? "Hovering!" : "Hover me!"}
    </div>
  );
}
