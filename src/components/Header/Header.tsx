import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";
import { Brightness4, Brightness7, Menu, Close } from "@mui/icons-material";
import type { PaletteMode } from "@mui/material";

interface HeaderProps {
  mode: PaletteMode;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ mode, toggleTheme }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detecta scroll para mudar estilo do header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setMobileOpen(false);
  };

  const navItems = [
    { label: "Início", id: "hero" },
    { label: "Tech Stack", id: "techstack" },
    { label: "Projetos", id: "projects" },
    { label: "Sobre", id: "about" },
    { label: "Contato", id: "contact" },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: scrolled
            ? mode === "dark"
              ? "rgba(15, 23, 42, 0.8)"
              : "rgba(255, 255, 255, 0.8)"
            : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: scrolled
            ? mode === "dark"
              ? "1px solid rgba(148, 163, 184, 0.1)"
              : "1px solid rgba(203, 213, 225, 0.3)"
            : "none",
          transition: "all 0.3s ease-in-out",
          boxShadow: scrolled
            ? mode === "dark"
              ? "0 4px 30px rgba(0, 0, 0, 0.3)"
              : "0 4px 30px rgba(0, 0, 0, 0.05)"
            : "none",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
            {/* Logo */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                cursor: "pointer",
                fontSize: { xs: "1.2rem", md: "1.5rem" },
                letterSpacing: "-0.5px",
              }}
              onClick={() => scrollToSection("hero")}
            >
              {"<Dev/>"}
            </Typography>

            {/* Desktop Navigation */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 1,
                alignItems: "center",
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  sx={{
                    color: mode === "dark" ? "text.primary" : "text.primary",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background:
                        mode === "dark"
                          ? "rgba(59, 130, 246, 0.1)"
                          : "rgba(37, 99, 235, 0.1)",
                      transform: "translateY(-2px)",
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: "translateX(-50%) scaleX(0)",
                      width: "80%",
                      height: "2px",
                      background: "linear-gradient(90deg, #667eea, #764ba2)",
                      transition: "transform 0.3s ease",
                    },
                    "&:hover::before": {
                      transform: "translateX(-50%) scaleX(1)",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}

              {/* Theme Toggle */}
              <IconButton
                onClick={toggleTheme}
                sx={{
                  ml: 1,
                  background:
                    mode === "dark"
                      ? "rgba(59, 130, 246, 0.1)"
                      : "rgba(37, 99, 235, 0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background:
                      mode === "dark"
                        ? "rgba(59, 130, 246, 0.2)"
                        : "rgba(37, 99, 235, 0.2)",
                    transform: "rotate(180deg)",
                  },
                }}
              >
                {mode === "dark" ? (
                  <Brightness7 sx={{ color: "#fbbf24" }} />
                ) : (
                  <Brightness4 sx={{ color: "#6366f1" }} />
                )}
              </IconButton>
            </Box>

            {/* Mobile Menu Button */}
            <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
              <IconButton
                onClick={toggleTheme}
                sx={{
                  background:
                    mode === "dark"
                      ? "rgba(59, 130, 246, 0.1)"
                      : "rgba(37, 99, 235, 0.1)",
                }}
              >
                {mode === "dark" ? (
                  <Brightness7 sx={{ color: "#fbbf24" }} />
                ) : (
                  <Brightness4 sx={{ color: "#6366f1" }} />
                )}
              </IconButton>
              <IconButton
                onClick={handleDrawerToggle}
                sx={{
                  background:
                    mode === "dark"
                      ? "rgba(59, 130, 246, 0.1)"
                      : "rgba(37, 99, 235, 0.1)",
                }}
              >
                {mobileOpen ? <Close /> : <Menu />}
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Menu */}
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          top: 70,
          left: 0,
          right: 0,
          background:
            mode === "dark"
              ? "rgba(15, 23, 42, 0.98)"
              : "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(10px)",
          transform: mobileOpen ? "translateY(0)" : "translateY(-100%)",
          opacity: mobileOpen ? 1 : 0,
          transition: "all 0.3s ease-in-out",
          zIndex: 1000,
          borderBottom:
            mode === "dark"
              ? "1px solid rgba(148, 163, 184, 0.1)"
              : "1px solid rgba(203, 213, 225, 0.3)",
          boxShadow:
            mode === "dark"
              ? "0 10px 40px rgba(0, 0, 0, 0.3)"
              : "0 10px 40px rgba(0, 0, 0, 0.1)",
          pointerEvents: mobileOpen ? "auto" : "none",
        }}
      >
        <Container>
          <Box sx={{ py: 3, display: "flex", flexDirection: "column", gap: 1 }}>
            {navItems.map((item, index) => (
              <Button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                fullWidth
                sx={{
                  justifyContent: "flex-start",
                  color: mode === "dark" ? "text.primary" : "text.primary",
                  py: 1.5,
                  px: 2,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 500,
                  background:
                    mode === "dark"
                      ? "rgba(30, 41, 59, 0.5)"
                      : "rgba(248, 250, 252, 0.5)",
                  transition: "all 0.2s ease",
                  animation: mobileOpen
                    ? `slideIn 0.3s ease-out ${index * 0.1}s both`
                    : "none",
                  "&:hover": {
                    background:
                      mode === "dark"
                        ? "rgba(59, 130, 246, 0.15)"
                        : "rgba(37, 99, 235, 0.1)",
                    transform: "translateX(8px)",
                  },
                  "@keyframes slideIn": {
                    from: {
                      opacity: 0,
                      transform: "translateX(-20px)",
                    },
                    to: {
                      opacity: 1,
                      transform: "translateX(0)",
                    },
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
};