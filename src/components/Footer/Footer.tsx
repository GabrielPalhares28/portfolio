import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Container,
  useTheme,
  alpha,
  Divider,
  Link,
} from "@mui/material";
import {
  GitHub,
  LinkedIn,
  Email,
  WhatsApp,
  FavoriteBorder,
  KeyboardArrowUp,
} from "@mui/icons-material";

const socialLinks = [
  {
    icon: <GitHub />,
    href: "https://github.com/GabrielPalhares28",
    label: "GitHub",
    color: "#333",
  },
  {
    icon: <LinkedIn />,
    href: "https://www.linkedin.com/in/gabriel-palhares94bb30204",
    label: "LinkedIn",
    color: "#0077b5",
  },
  {
    icon: <Email />,
    href: "mailto:gabrielpalhares764@gmail.com",
    label: "Email",
    color: "#ea4335",
  },
  {
    icon: <WhatsApp />,
    href: "https://wa.me/5564992980763",
    label: "WhatsApp",
    color: "#25d366",
  },
];

const quickLinks = [
  { label: "Início", id: "hero" },
  { label: "Tech Stack", id: "techstack" },
  { label: "Projetos", id: "projects" },
  { label: "Sobre", id: "about" },
  { label: "Contato", id: "contact" },
];

export const Footer: React.FC = () => {
  const theme = useTheme();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)"
            : "linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)",
        borderTop: `1px solid ${
          theme.palette.mode === "dark"
            ? "rgba(148, 163, 184, 0.1)"
            : "rgba(203, 213, 225, 0.5)"
        }`,
      }}
    >
      {/* Wave Decoration */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #667eea 0%, #764ba2 50%, #667eea 100%)",
          backgroundSize: "200% 100%",
          animation: "gradient 3s ease infinite",
          "@keyframes gradient": {
            "0%, 100%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
          },
        }}
      />

      <Container maxWidth="lg">
        <Box sx={{ py: { xs: 6, md: 8 } }}>
          {/* Top Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "center", md: "flex-start" },
              gap: 4,
              mb: 4,
            }}
          >
            {/* Brand & Description */}
            <Box
              sx={{
                flex: 1,
                textAlign: { xs: "center", md: "left" },
                maxWidth: { xs: "100%", md: "400px" },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  mb: 1.5,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-0.5px",
                }}
              >
                {"<Gabriel Palhares />"}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  lineHeight: 1.7,
                  mb: 2,
                }}
              >
                Desenvolvedor Full Stack apaixonado por criar experiências digitais
                incríveis e sistemas escaláveis.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 0.5,
                  alignItems: "center",
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  Feito com
                </Typography>
                <FavoriteBorder
                  sx={{
                    fontSize: "1rem",
                    color: "#ec4899",
                    animation: "heartbeat 1.5s ease-in-out infinite",
                    "@keyframes heartbeat": {
                      "0%, 100%": { transform: "scale(1)" },
                      "50%": { transform: "scale(1.2)" },
                    },
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  e React + TypeScript
                </Typography>
              </Box>
            </Box>

            {/* Quick Links */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  color: theme.palette.text.primary,
                }}
              >
                Navegação Rápida
              </Typography>
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  onClick={() => scrollToSection(link.id)}
                  sx={{
                    color: theme.palette.text.secondary,
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      color: theme.palette.primary.main,
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>

            {/* Social Links */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
                gap: 2,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                }}
              >
                Conecte-se Comigo
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 1.5,
                }}
              >
                {socialLinks.map((social, index) => (
                  <IconButton
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    sx={{
                      background:
                        theme.palette.mode === "dark"
                          ? alpha(social.color, 0.1)
                          : alpha(social.color, 0.08),
                      border: `1px solid ${alpha(social.color, 0.2)}`,
                      color: social.color,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: alpha(social.color, 0.2),
                        transform: "translateY(-4px)",
                        boxShadow: `0 4px 20px ${alpha(social.color, 0.4)}`,
                      },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Box>

          <Divider
            sx={{
              my: 3,
              borderColor:
                theme.palette.mode === "dark"
                  ? "rgba(148, 163, 184, 0.1)"
                  : "rgba(203, 213, 225, 0.5)",
            }}
          />

          {/* Bottom Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              © {new Date().getFullYear()} Gabriel Palhares. Todos os direitos
              reservados.
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: "0.75rem",
                }}
              >
                v1.0.0
              </Typography>
              <Box
                sx={{
                  width: 1,
                  height: 16,
                  background:
                    theme.palette.mode === "dark"
                      ? "rgba(148, 163, 184, 0.2)"
                      : "rgba(203, 213, 225, 0.5)",
                }}
              />
              <Link
                href="https://github.com/GabrielPalhares28"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: theme.palette.text.secondary,
                  textDecoration: "none",
                  fontSize: "0.75rem",
                  transition: "color 0.2s ease",
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                View Source
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Scroll to Top Button */}
      <IconButton
        onClick={scrollToTop}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "#fff",
          width: 48,
          height: 48,
          boxShadow: "0 4px 20px rgba(102, 126, 234, 0.4)",
          transition: "all 0.3s ease",
          zIndex: 1000,
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 6px 30px rgba(102, 126, 234, 0.6)",
          },
          animation: "fadeIn 0.5s ease",
          "@keyframes fadeIn": {
            from: { opacity: 0, transform: "translateY(20px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
        aria-label="Voltar ao topo"
      >
        <KeyboardArrowUp />
      </IconButton>
    </Box>
  );
};