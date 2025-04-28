import { useMultipleRefs } from "../../hooks/UtilityHooks/useMultipleRefs";
import { usePhysics2DGroup } from "../../hooks/GsapClub/usePhysics2DGroup";

export function Physics2DGroupDemo() {
  const ballRefs = useMultipleRefs<HTMLDivElement>(20);

  usePhysics2DGroup(
    ballRefs.map((ref) => ({
      ref,
      options: {
        velocity: { x: Math.random() * 400 - 200, y: Math.random() * -400 },
        gravity: 700,
        friction: 1,
        duration: 3,
        rotation: true,
      },
    }))
  );

  return (
    <>
      {ballRefs.map((ref, index) => (
        <div
          key={index}
          ref={ref}
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: `hsl(${index * 18}, 100%, 50%)`,
            borderRadius: "50%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </>
  );
}
