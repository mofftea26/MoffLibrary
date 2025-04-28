import { useState } from "react";
import "./App.css";
// Demos
import {
  DrawSVGDemo,
  SplitTextDemo,
  InertiaMotionDemo,
  SmoothScrollDemo,
  ScrambleTextDemo,
  Physics2DDemo,
  Physics2DGroupDemo,
  ParticleExplosionDemo,
  DraggableInertiaDemo,
} from "./demos/GsapClub";

import { HomeScreen } from "./components/HomeScreen";
import { GsapClubScreen } from "./components/GsapClubScreen";
import { UtilityHooksScreen } from "./components/UtilityHooks";

import {
  ClipboardDemo,
  DebounceDemo,
  DocumentTitleDemo,
  EventListenerDemo,
  FetchDemo,
  HoverDemo,
  IntersectionObserverDemo,
  KeyPressDemo,
  LocalStorageDemo,
  AsyncDemo,
  MousePositionDemo,
  MultipleRefsDemo,
  OnClickOutsideDemo,
  OnlineStatusDemo,
  PreviousDemo,
  ThrottleDemo,
  ToggleDemo,
  WindowSizeDemo,
  MediaQueryDemo,
} from "./demos/UtilityHooks";
import { ThemeToggle } from "./components/providers/ThemeProvider/ThemeToggle";
export type Category = "Home" | "GsapClub" | "UtilityHooks";

export type Demo =
  | "Home"
  // GsapClub
  | "DrawSVG"
  | "SplitText"
  | "InertiaMotion"
  | "SmoothScroll"
  | "ScrambleText"
  | "Physics2D"
  | "Physics2DGroup"
  | "ParticleExplosion"
  | "DraggableInertia"
  // UtilityHooks
  | "Clipboard"
  | "Debounce"
  | "DocumentTitle"
  | "EventListener"
  | "Fetch"
  | "Hover"
  | "IntersectionObserver"
  | "KeyPress"
  | "LocalStorage"
  | "Async"
  | "MousePosition"
  | "MultipleRefs"
  | "OnClickOutside"
  | "OnlineStatus"
  | "Previous"
  | "Throttle"
  | "Toggle"
  | "WindowSize"
  | "MediaQuery";

function App() {
  const [currentCategory, setCurrentCategory] = useState<Category>("Home");
  const [currentDemo, setCurrentDemo] = useState<Demo>("Home");

  return (
    <div className="container">
      <div
        style={{ position: "fixed", top: "1rem", right: "1rem", zIndex: 999 }}
      >
        <ThemeToggle />
      </div>
      {currentCategory === "Home" && (
        <HomeScreen setCategory={setCurrentCategory} />
      )}

      {currentCategory !== "Home" && currentDemo === "Home" && (
        <>
          <button
            className="back-button"
            onClick={() => setCurrentCategory("Home")}
          >
            ⬅ Back to Home
          </button>

          {currentCategory === "GsapClub" && (
            <GsapClubScreen setDemo={setCurrentDemo} />
          )}
          {currentCategory === "UtilityHooks" && (
            <UtilityHooksScreen setDemo={setCurrentDemo} />
          )}
        </>
      )}

      {currentDemo !== "Home" && (
        <button className="back-button" onClick={() => setCurrentDemo("Home")}>
          ⬅ Back to Demos
        </button>
      )}

      {/* GSAP Club Demos */}
      {currentDemo === "DrawSVG" && <DrawSVGDemo />}
      {currentDemo === "SplitText" && <SplitTextDemo />}
      {currentDemo === "InertiaMotion" && <InertiaMotionDemo />}
      {currentDemo === "SmoothScroll" && <SmoothScrollDemo />}
      {currentDemo === "ScrambleText" && <ScrambleTextDemo />}
      {currentDemo === "Physics2D" && <Physics2DDemo />}
      {currentDemo === "Physics2DGroup" && <Physics2DGroupDemo />}
      {currentDemo === "ParticleExplosion" && <ParticleExplosionDemo />}
      {currentDemo === "DraggableInertia" && <DraggableInertiaDemo />}

      {/* Utility Hooks Demos */}
      {currentDemo === "Clipboard" && <ClipboardDemo />}
      {currentDemo === "Debounce" && <DebounceDemo />}
      {currentDemo === "DocumentTitle" && <DocumentTitleDemo />}
      {currentDemo === "EventListener" && <EventListenerDemo />}
      {currentDemo === "Fetch" && <FetchDemo />}
      {currentDemo === "Hover" && <HoverDemo />}
      {currentDemo === "IntersectionObserver" && <IntersectionObserverDemo />}
      {currentDemo === "KeyPress" && <KeyPressDemo />}
      {currentDemo === "LocalStorage" && <LocalStorageDemo />}
      {currentDemo === "Async" && <AsyncDemo />}
      {currentDemo === "MousePosition" && <MousePositionDemo />}
      {currentDemo === "MultipleRefs" && <MultipleRefsDemo />}
      {currentDemo === "OnClickOutside" && <OnClickOutsideDemo />}
      {currentDemo === "OnlineStatus" && <OnlineStatusDemo />}
      {currentDemo === "Previous" && <PreviousDemo />}
      {currentDemo === "Throttle" && <ThrottleDemo />}
      {currentDemo === "Toggle" && <ToggleDemo />}
      {currentDemo === "WindowSize" && <WindowSizeDemo />}
      {currentDemo === "MediaQuery" && <MediaQueryDemo />}
    </div>
  );
}

export default App;
