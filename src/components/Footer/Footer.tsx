import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Container,
  useTheme,
  Divider,
  Link,
} from "@mui/material";
import { FavoriteBorder, KeyboardArrowUp } from "@mui/icons-material";
import { navItems } from "../../data/navigation";
import { GITHUB_PROFILE_URL, socialLinks } from "../../data/social";
import {
  BRAND_GRADIENT,
  SURFACE_COLORS,
  accentIconButton,
  brandGradientText,
  fadeIn,
  sectionGradient,
  subtleBorderColor,
} from "../../theme/styles";
import { scrollToSection, scrollToTop } from "../../utils/scroll";

export const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        background: sectionGradient(theme, {
          dark: [SURFACE_COLORS.darkSoft, SURFACE_COLORS.darkDeep],
          light: [SURFACE_COLORS.lightSoft, SURFACE_COLORS.lightMuted],
        }),
        borderTop: `1px solid ${subtleBorderColor(theme)}`,
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
                  ...brandGradientText,
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
              {navItems.map((link) => (
                <Link
                  key={link.id}
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
                {socialLinks.map((social) => (
                  <IconButton
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    sx={accentIconButton(social.color, theme.palette.mode, {
                      lift: 4,
                      glow: true,
                      tintIcon: true,
                    })}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 3, borderColor: subtleBorderColor(theme) }} />

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
                  background: subtleBorderColor(theme),
                }}
              />
              <Link
                href={GITHUB_PROFILE_URL}
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
          background: BRAND_GRADIENT,
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
          ...fadeIn({ distance: 20, duration: 0.5 }),
        }}
        aria-label="Voltar ao topo"
      >
        <KeyboardArrowUp />
      </IconButton>
    </Box>
  );
};