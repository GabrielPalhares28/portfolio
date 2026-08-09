import React from "react";
import {
  Box,
  Typography,
  Container,
  useTheme,
  alpha,
  Grid,
  Button,
} from "@mui/material";
import { GitHub } from "@mui/icons-material";
import { ProjectCard } from "./ProjectCard";
import { projects } from "../../data/projects";

export const Projects: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      id="projects"
      sx={{
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)"
            : "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
      }}
    >
      {/* Background Decoration */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "-5%",
          width: "400px",
          height: "400px",
          background:
            theme.palette.mode === "dark"
              ? "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="overline"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 700,
              fontSize: "0.875rem",
              letterSpacing: "2px",
              mb: 1,
              display: "block",
            }}
          >
            PORTFÓLIO
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 800,
              mb: 2,
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, #f1f5f9 0%, #94a3b8 100%)"
                  : "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Projetos em Destaque
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: "600px",
              mx: "auto",
              fontSize: { xs: "1rem", md: "1.125rem" },
            }}
          >
            Alguns dos trabalhos que desenvolvi e que demonstram minhas habilidades
          </Typography>
        </Box>

        {/* Projects Grid */}
        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <Grid item xs={12} sm={6} lg={4} key={index}>
              <Box
                sx={{
                  height: "100%",
                  animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`,
                  "@keyframes fadeInUp": {
                    from: { opacity: 0, transform: "translateY(30px)" },
                    to: { opacity: 1, transform: "translateY(0)" },
                  },
                }}
              >
                <ProjectCard {...project} />
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* CTA Bottom */}
        <Box
          sx={{
            mt: 8,
            textAlign: "center",
            p: 4,
            borderRadius: 3,
            background:
              theme.palette.mode === "dark"
                ? alpha(theme.palette.primary.main, 0.05)
                : alpha(theme.palette.primary.main, 0.03),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 1,
              color: theme.palette.text.primary,
            }}
          >
            Quer ver mais? 👀
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              mb: 2,
            }}
          >
            Confira meu GitHub para ver todos os meus projetos
          </Typography>
          <Button
            variant="outlined"
            startIcon={<GitHub />}
            href="https://github.com/GabrielPalhares28"
            target="_blank"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderWidth: 2,
              px: 3,
              "&:hover": {
                borderWidth: 2,
              },
            }}
          >
            Visitar GitHub
          </Button>
        </Box>
      </Container>
    </Box>
  );
};