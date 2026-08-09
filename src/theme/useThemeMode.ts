import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { PaletteMode, Theme } from "@mui/material";
import { darkTheme, lightTheme } from "./theme";

export const THEME_STORAGE_KEY = "themeMode";

const getInitialMode = (): PaletteMode => {
  const savedMode = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedMode === "light" || savedMode === "dark") return savedMode;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export interface ThemeModeState {
  mode: PaletteMode;
  theme: Theme;
  toggleTheme: () => void;
}

/** Persisted light/dark mode plus the matching MUI theme. */
export const useThemeMode = (): ThemeModeState => {
  const [mode, setMode] = useState<PaletteMode>(getInitialMode);

  const toggleTheme = useCallback(() => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem(THEME_STORAGE_KEY, newMode);
      return newMode;
    });
  }, []);

  const theme = useMemo(
    () => (mode === "light" ? lightTheme : darkTheme),
    [mode]
  );

  return { mode, theme, toggleTheme };
};

export const ThemeModeContext = createContext<
  Pick<ThemeModeState, "mode" | "toggleTheme">
>({
  mode: "light",
  toggleTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeModeContext);
