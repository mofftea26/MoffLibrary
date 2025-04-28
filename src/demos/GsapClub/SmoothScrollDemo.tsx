import { useSmoothScroll } from "../../hooks/GsapClub/useSmoothScroll";

export function SmoothScrollDemo() {
  useSmoothScroll({ smoothWheel: true, wheelMultiplier: 1.2 });

  return (
    <div style={{ height: "300vh" }}>
      <h1>Smooth Scroll</h1>
      <section style={{ marginTop: "100vh" }}>Scroll Me!</section>
    </div>
  );
}
