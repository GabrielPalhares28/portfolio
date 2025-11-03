import React, { createContext, useMemo, useState, useContext } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme, darkTheme } from "./theme";

interface ThemeContextType {
  toggleTheme: () => void;
  mode: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType>({
  toggleTheme: () => {},
  mode: "light",
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "light"
  );

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  const theme = useMemo(() => (mode === "light" ? lightTheme : darkTheme), [mode]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
