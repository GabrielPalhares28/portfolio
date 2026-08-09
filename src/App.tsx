import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useThemeMode } from "./theme/useThemeMode";
import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";
import { TechStack } from "./components/TechStack/TechStack";
import { Projects } from "./components/Projects/Projects";
import { About } from "./components/About/About";
import { Contact } from "./components/Contact/Contact";
import { Footer } from "./components/Footer/Footer";

const App: React.FC = () => {
  const { mode, theme, toggleTheme } = useThemeMode();

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
