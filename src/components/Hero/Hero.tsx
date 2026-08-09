import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  IconButton,
  useTheme,
  alpha,
} from "@mui/material";
import { Download, KeyboardArrowDown } from "@mui/icons-material";
import { DecorativeBlob } from "../common/DecorativeBlob";
import {
  SURFACE_COLORS,
  accentIconButton,
  pulse,
  brandGradientText,
  fadeIn,
  gradientButton,
  headingGradientText,
  sectionGradient,
} from "../../theme/styles";
import { heroSocialLinks } from "../../data/social";
import { scrollToSection } from "../../utils/scroll";

export const Hero: React.FC = () => {
  const theme = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Efeito parallax suave com o mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);


  return (
    <Box
      id="hero"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background: sectionGradient(theme, {
          angle: 135,
          dark: [
            SURFACE_COLORS.darkDeep,
            SURFACE_COLORS.darkSoft,
            SURFACE_COLORS.darkDeep,
          ],
          light: [
            SURFACE_COLORS.lightSoft,
            SURFACE_COLORS.lightMuted,
            SURFACE_COLORS.lightSoft,
          ],
        }),
      }}
    >
      {/* Background Animated Blobs */}
      <DecorativeBlob
        size="500px"
        darkColor="59, 130, 246"
        lightColor="37, 99, 235"
        darkOpacity={0.15}
        lightOpacity={0.1}
        sx={{
          top: "10%",
          left: "5%",
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: "transform 0.3s ease-out",
          animation: "float 20s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": { transform: "translate(0, 0)" },
            "50%": { transform: "translate(50px, 50px)" },
          },
        }}
      />
      <DecorativeBlob
        size="400px"
        darkColor="139, 92, 246"
        lightColor="124, 58, 237"
        darkOpacity={0.15}
        lightOpacity={0.1}
        sx={{
          bottom: "15%",
          right: "10%",
          transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
          transition: "transform 0.3s ease-out",
          animation: "float 15s ease-in-out infinite reverse",
        }}
      />

      {/* Grid Pattern Background */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            theme.palette.mode === "dark"
              ? `linear-gradient(rgba(148, 163, 184, 0.03) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(148, 163, 184, 0.03) 1px, transparent 1px)`
              : `linear-gradient(rgba(203, 213, 225, 0.3) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(203, 213, 225, 0.3) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          opacity: 0.5,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, pt: 10 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            textAlign: { xs: "center", md: "left" },
            gap: 3,
          }}
        >
          {/* Badge */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 0.75,
              background: alpha(theme.palette.primary.main, 0.1),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              borderRadius: "50px",
              ...fadeIn({ distance: 20 }),
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#10b981",
                ...pulse(),
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: theme.palette.primary.main,
                fontSize: "0.875rem",
              }}
            >
              Disponível para novos projetos
            </Typography>
          </Box>

          {/* Main Title */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                mb: 1,
                ...fadeIn({ distance: 20, delay: 0.1 }),
              }}
            >
              Olá, eu sou
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                fontWeight: 800,
                lineHeight: 1.1,
                mb: 2,
                ...headingGradientText(theme),
                ...fadeIn({ distance: 20, delay: 0.2 }),
              }}
            >
              Gabriel Palhares
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
                fontWeight: 700,
                ...brandGradientText,
                ...fadeIn({ distance: 20, delay: 0.3 }),
              }}
            >
              Desenvolvedor Full Stack
            </Typography>
          </Box>

          {/* Description */}
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: "600px",
              fontSize: { xs: "1rem", md: "1.25rem" },
              fontWeight: 400,
              lineHeight: 1.6,
              ...fadeIn({ distance: 20, delay: 0.4 }),
            }}
          >
            Construindo experiências digitais incríveis com código limpo e design
            moderno. Especializado em React, TypeScript e Node.js.
          </Typography>

          {/* CTA Buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              mt: 2,
              ...fadeIn({ distance: 20, delay: 0.5 }),
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => scrollToSection("projects")}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                ...gradientButton,
              }}
            >
              Ver Projetos
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<Download />}
              href="/cv.pdf"
              download
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "none",
                borderWidth: 2,
                borderColor:
                  theme.palette.mode === "dark"
                    ? alpha(theme.palette.primary.main, 0.3)
                    : theme.palette.primary.main,
                color: theme.palette.text.primary,
                transition: "all 0.3s ease",
                "&:hover": {
                  borderWidth: 2,
                  borderColor: theme.palette.primary.main,
                  background: alpha(theme.palette.primary.main, 0.1),
                  transform: "translateY(-2px)",
                },
              }}
            >
              Download CV
            </Button>
          </Box>

          {/* Social Links */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 2,
              ...fadeIn({ distance: 20, delay: 0.6 }),
            }}
          >
            {heroSocialLinks.map((social) => (
              <IconButton
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                sx={accentIconButton(
                  theme.palette.primary.main,
                  theme.palette.mode,
                  { idleLight: 0.05 }
                )}
                aria-label={social.label}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Container>

      {/* Scroll Indicator */}
      <Box
        sx={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
          animation: "bounce 2s ease-in-out infinite",
          "@keyframes bounce": {
            "0%, 100%": { transform: "translateX(-50%) translateY(0)" },
            "50%": { transform: "translateX(-50%) translateY(-10px)" },
          },
        }}
        onClick={() => scrollToSection("techstack")}
      >
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          Scroll
        </Typography>
        <KeyboardArrowDown
          sx={{
            color: theme.palette.text.secondary,
            fontSize: "2rem",
          }}
        />
      </Box>
    </Box>
  );
};