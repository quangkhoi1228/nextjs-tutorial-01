import { useTheme } from "../hooks/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded border transition bg-gray-200 dark:bg-gray-800 dark:text-white"
      style={{ transition: "background 0.3s, color 0.3s" }}
    >
      {theme === "light" ? "🌞 Light" : "🌙 Dark"}
    </button>
  );
} 