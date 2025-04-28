import { FC } from "react";
import { Demo } from "../App";

interface UtilityHooksScreenProps {
  setDemo: (demo: Demo) => void;
}

export const UtilityHooksScreen: FC<UtilityHooksScreenProps> = ({
  setDemo,
}) => {
  return (
    <>
      <h2>Utility Hooks Demos</h2>
      <div className="button-grid">
        <button onClick={() => setDemo("Clipboard")}>Clipboard</button>
        <button onClick={() => setDemo("Debounce")}>Debounce</button>
        <button onClick={() => setDemo("DocumentTitle")}>Document Title</button>
        <button onClick={() => setDemo("EventListener")}>Event Listener</button>
        <button onClick={() => setDemo("Fetch")}>Fetch</button>
        <button onClick={() => setDemo("Hover")}>Hover</button>
        <button onClick={() => setDemo("IntersectionObserver")}>
          Intersection Observer
        </button>
        <button onClick={() => setDemo("KeyPress")}>KeyPress</button>
        <button onClick={() => setDemo("LocalStorage")}>LocalStorage</button>
        <button onClick={() => setDemo("Async")}>Async</button>
        <button onClick={() => setDemo("MousePosition")}>Mouse Position</button>
        <button onClick={() => setDemo("MultipleRefs")}>Multiple Refs</button>
        <button onClick={() => setDemo("OnClickOutside")}>
          OnClickOutside
        </button>
        <button onClick={() => setDemo("OnlineStatus")}>Online Status</button>
        <button onClick={() => setDemo("Previous")}>Previous</button>
        <button onClick={() => setDemo("Throttle")}>Throttle</button>
        <button onClick={() => setDemo("Toggle")}>Toggle</button>
        <button onClick={() => setDemo("WindowSize")}>Window Size</button>
        <button onClick={() => setDemo("MediaQuery")}>Media Query</button>
      </div>
    </>
  );
};
