import { usePhysics2DController } from "../../hooks/GsapClub/usePhysics2DEXplosion";

export function ParticleExplosionDemo() {
  const { spawnParticleExplosion } = usePhysics2DController();

  const handleClick = (e: React.MouseEvent) => {
    spawnParticleExplosion(e.clientX, e.clientY - 250, {
      count: 100,
      particle: <div style={{ fontSize: "20px" }}>🎈</div>,
      strength: 500,
      size: 10,
      color: "#00ffff",
      gravity: 300,
      rotation: true,
      duration: 4,
    });
  };

  return (
    <div style={{ height: "100vh", background: "#111" }} onClick={handleClick}>
      <h1 style={{ color: "#fff", textAlign: "center", paddingTop: "2rem" }}>
        Click anywhere for confetti 🎉
      </h1>
    </div>
  );
}
