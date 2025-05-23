import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "../../components/shared/Button";
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      className="justify-start p-2"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <>
          <Sun className="size-4" />
          <p>Light Mode</p>
        </>
      ) : (
        <>
          <Moon className="size-4" />
          <p>Dark Mode</p>
        </>
      )}
    </Button>
  );
}
