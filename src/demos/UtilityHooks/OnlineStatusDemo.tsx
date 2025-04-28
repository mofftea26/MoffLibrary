import { useOnlineStatus } from "../../hooks/UtilityHooks/useOnlineStatus";

export function OnlineStatusDemo() {
  const isOnline = useOnlineStatus();

  return <h2>{isOnline ? "🟢 Online" : "🔴 Offline"}</h2>;
}
