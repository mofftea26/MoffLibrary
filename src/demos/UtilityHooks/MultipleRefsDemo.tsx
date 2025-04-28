import { useMultipleRefs } from "../../hooks/UtilityHooks/useMultipleRefs";

export function MultipleRefsDemo() {
  const refs = useMultipleRefs<HTMLDivElement>(5);

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {refs.map((ref, i) => (
        <div
          key={i}
          ref={ref}
          style={{ width: 50, height: 50, background: "blue" }}
        />
      ))}
    </div>
  );
}
