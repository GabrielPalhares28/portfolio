import React from "react";
import { Box, Typography, Container, useTheme, Grid, Button } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import { ProjectCard } from "./ProjectCard";
import { projects } from "../../data/projects";
import { DecorativeBlob } from "../common/DecorativeBlob";
import { HighlightPanel } from "../common/HighlightPanel";
import { SectionHeading } from "../common/SectionHeading";
import { SURFACE_COLORS, fadeIn, sectionGradient } from "../../theme/styles";
import { GITHUB_PROFILE_URL } from "../../data/social";

export const Projects: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      id="projects"
      sx={{
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
        background: sectionGradient(theme, {
          dark: [SURFACE_COLORS.darkDeep, SURFACE_COLORS.darkSoft],
          light: [SURFACE_COLORS.lightSoft, SURFACE_COLORS.lightPlain],
        }),
      }}
    >
      {/* Background Decoration */}
      <DecorativeBlob
        size="400px"
        color="139, 92, 246"
        blur={80}
        sx={{ top: "10%", left: "-5%" }}
      />

      <Container maxWidth="lg">
        <SectionHeading
          overline="PORTFÓLIO"
          title="Projetos em Destaque"
          subtitle="Alguns dos trabalhos que desenvolvi e que demonstram minhas habilidades"
        />

        {/* Projects Grid */}
        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <Grid item xs={12} sm={6} lg={4} key={index}>
              <Box sx={{ height: "100%", ...fadeIn({ delay: index * 0.15 }) }}>
                <ProjectCard {...project} />
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* CTA Bottom */}
        <HighlightPanel sx={{ mt: 8 }}>
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
            href={GITHUB_PROFILE_URL}
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
        </HighlightPanel>
      </Container>
    </Box>
  );
};