import { useToggle } from "../../hooks/UtilityHooks/useToggle";

export function ToggleDemo() {
  const [isOn, toggle] = useToggle(false);

  return <button onClick={toggle}>{isOn ? "On" : "Off"}</button>;
}
