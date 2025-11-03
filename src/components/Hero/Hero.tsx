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
import {
  GitHub,
  LinkedIn,
  Email,
  Download,
  KeyboardArrowDown,
} from "@mui/icons-material";

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const socialLinks = [
    { icon: <GitHub />, href: "https://github.com/GabrielPalhares28", label: "GitHub" },
    { icon: <LinkedIn />, href: "https://linkedin.com/in/gabriel-palhares-94bb30204", label: "LinkedIn" },
    { icon: <Email />, href: "gabrielpalhares764@gmail.com", label: "Email" },
  ];

  return (
    <Box
      id="hero"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)"
            : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f8fafc 100%)",
      }}
    >
      {/* Background Animated Blobs */}
      <Box
        sx={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background:
            theme.palette.mode === "dark"
              ? "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          top: "10%",
          left: "5%",
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: "transform 0.3s ease-out",
          filter: "blur(60px)",
          animation: "float 20s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": { transform: "translate(0, 0)" },
            "50%": { transform: "translate(50px, 50px)" },
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background:
            theme.palette.mode === "dark"
              ? "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          bottom: "15%",
          right: "10%",
          transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
          transition: "transform 0.3s ease-out",
          filter: "blur(60px)",
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
              background:
                theme.palette.mode === "dark"
                  ? alpha(theme.palette.primary.main, 0.1)
                  : alpha(theme.palette.primary.main, 0.1),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              borderRadius: "50px",
              animation: "fadeInUp 0.6s ease-out",
              "@keyframes fadeInUp": {
                from: { opacity: 0, transform: "translateY(20px)" },
                to: { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#10b981",
                animation: "pulse 2s ease-in-out infinite",
                "@keyframes pulse": {
                  "0%, 100%": { opacity: 1 },
                  "50%": { opacity: 0.5 },
                },
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
                animation: "fadeInUp 0.6s ease-out 0.1s both",
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
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, #f1f5f9 0%, #94a3b8 100%)"
                    : "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "fadeInUp 0.6s ease-out 0.2s both",
              }}
            >
              Gabriel Palhares
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
                fontWeight: 700,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "fadeInUp 0.6s ease-out 0.3s both",
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
              animation: "fadeInUp 0.6s ease-out 0.4s both",
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
              animation: "fadeInUp 0.6s ease-out 0.5s both",
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
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "none",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 25px rgba(102, 126, 234, 0.6)",
                },
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
              animation: "fadeInUp 0.6s ease-out 0.6s both",
            }}
          >
            {socialLinks.map((social, index) => (
              <IconButton
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  background:
                    theme.palette.mode === "dark"
                      ? alpha(theme.palette.primary.main, 0.1)
                      : alpha(theme.palette.primary.main, 0.05),
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: alpha(theme.palette.primary.main, 0.2),
                    transform: "translateY(-3px)",
                    borderColor: theme.palette.primary.main,
                  },
                }}
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