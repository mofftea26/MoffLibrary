import { useKeyPress } from "../../hooks/UtilityHooks/useKeyPress";

export function KeyPressDemo() {
  const enterPressed = useKeyPress("Enter");

  return <h2>{enterPressed ? "Enter Key Pressed!" : "Press Enter Key"}</h2>;
}
