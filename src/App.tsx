import React, { useState } from "react";
import type { PaletteMode } from "@mui/material";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./theme/theme";
import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";
import { TechStack } from "./components/TechStack/TechStack";
import { Projects } from "./components/Projects/Projects";
import { About } from "./components/About/About";
import { Contact } from "./components/Contact/Contact";
import { Footer } from "./components/Footer/Footer";
import { readStorage, writeStorage } from "./utils/storage";

const prefersDarkMode = (): boolean => {
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch (error) {
    console.warn("Não foi possível detectar o tema do sistema:", error);
    return false;
  }
};

const App: React.FC = () => {
  const [mode, setMode] = useState<PaletteMode>(() => {
    const savedMode = readStorage("themeMode");
    if (savedMode === "light" || savedMode === "dark") return savedMode;
    return prefersDarkMode() ? "dark" : "light";
  });

  const theme = mode === "light" ? lightTheme : darkTheme;

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      writeStorage("themeMode", newMode);
      return newMode;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header mode={mode} toggleTheme={toggleTheme} />
      <Hero />
      <TechStack />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </ThemeProvider>
  );
};

export default App;