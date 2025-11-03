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

const App: React.FC = () => {
  const [mode, setMode] = useState<PaletteMode>(() => {
    const savedMode = localStorage.getItem("themeMode") as PaletteMode | null;
    if (savedMode === "light" || savedMode === "dark") return savedMode;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  const theme = mode === "light" ? lightTheme : darkTheme;

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", newMode);
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