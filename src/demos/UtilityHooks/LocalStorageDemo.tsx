import { useLocalStorage } from "../../hooks/UtilityHooks/useLocalStorage";

export function LocalStorageDemo() {
  const [value, setValue] = useLocalStorage("name", "");

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Your Name"
    />
  );
}
