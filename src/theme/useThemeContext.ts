import { createContext, useContext } from "react";

interface ThemeContextType {
  toggleTheme: () => void;
  mode: "light" | "dark";
}

export const ThemeContext = createContext<ThemeContextType>({
  toggleTheme: () => {},
  mode: "light",
});

export const useThemeContext = () => useContext(ThemeContext);