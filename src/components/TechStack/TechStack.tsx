import React, { useState } from "react";
import { Box, Typography, Container, useTheme, alpha, Chip } from "@mui/material";
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiOpenjdk,
  SiSpringboot,
  SiNodedotjs,
  SiAngular,
  SiHtml5,
  SiCss3,
  SiPostgresql,
  SiMysql,
  SiGit,
  SiDocker,
} from "react-icons/si";
import { Code, Storage, Build } from "@mui/icons-material";
import { DecorativeBlob } from "../common/DecorativeBlob";
import { HighlightPanel } from "../common/HighlightPanel";
import { SectionHeading } from "../common/SectionHeading";
import {
  SURFACE_COLORS,
  fadeIn,
  sectionGradient,
  subtleBorderColor,
  surface,
} from "../../theme/styles";

// Organização por categorias
const skillCategories = [
  {
    title: "Frontend",
    icon: <Code />,
    color: "#667eea",
    skills: [
      { name: "React", icon: <SiReact />, color: "#61DAFB", level: "Avançado" },
      { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6", level: "Avançado" },
      { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E", level: "Avançado" },
      { name: "Angular", icon: <SiAngular />, color: "#DD0031", level: "Intermediário" },
      { name: "HTML5", icon: <SiHtml5 />, color: "#E34F26", level: "Avançado" },
      { name: "CSS3", icon: <SiCss3 />, color: "#1572B6", level: "Avançado" },
    ],
  },
  {
    title: "Backend",
    icon: <Storage />,
    color: "#764ba2",
    skills: [
      { name: "Node.js", icon: <SiNodedotjs />, color: "#68A063", level: "Avançado" },
      { name: "Java", icon: <SiOpenjdk />, color: "#E76F00", level: "Intermediário" },
      { name: "Spring Boot", icon: <SiSpringboot />, color: "#6DB33F", level: "Intermediário" },
      { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791", level: "Avançado" },
      { name: "MySQL", icon: <SiMysql />, color: "#00758F", level: "Intermediário" },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: <Build />,
    color: "#f59e0b",
    skills: [
      { name: "Git", icon: <SiGit />, color: "#F05032", level: "Avançado" },
      { name: "Docker", icon: <SiDocker />, color: "#0db7ed", level: "Intermediário" },
    ],
  },
];

export const TechStack: React.FC = () => {
  const theme = useTheme();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <Box
      id="techstack"
      sx={{
        py: { xs: 8, md: 12 },
        position: "relative",
        background: sectionGradient(theme, {
          dark: [
            SURFACE_COLORS.darkDeep,
            SURFACE_COLORS.darkSoft,
            SURFACE_COLORS.darkDeep,
          ],
          light: [
            SURFACE_COLORS.lightPlain,
            SURFACE_COLORS.lightSoft,
            SURFACE_COLORS.lightPlain,
          ],
        }),
      }}
    >
      {/* Background Decoration */}
      <DecorativeBlob size="300px" sx={{ top: "20%", right: "10%" }} />

      <Container maxWidth="lg">
        <SectionHeading
          overline="TECH STACK"
          title="Habilidades Técnicas"
          subtitle="Tecnologias e ferramentas que domino para criar soluções completas"
        />

        {/* Skills by Category */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {skillCategories.map((category, categoryIndex) => (
            <Box
              key={categoryIndex}
              sx={fadeIn({ delay: categoryIndex * 0.2 })}
            >
              {/* Category Header */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 3,
                  pb: 2,
                  borderBottom: `2px solid`,
                  borderColor:
                    theme.palette.mode === "dark"
                      ? alpha(category.color, 0.3)
                      : alpha(category.color, 0.2),
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    background: alpha(category.color, 0.1),
                    color: category.color,
                  }}
                >
                  {category.icon}
                </Box>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, color: theme.palette.text.primary }}
                >
                  {category.title}
                </Typography>
              </Box>

              {/* Skills Grid */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(2, 1fr)",
                    sm: "repeat(3, 1fr)",
                    md: "repeat(4, 1fr)",
                    lg: "repeat(5, 1fr)",
                  },
                  gap: 2,
                }}
              >
                {category.skills.map((skill, skillIndex) => (
                  <Box
                    key={skillIndex}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    sx={{
                      position: "relative",
                      ...surface(theme, { light: 0.8 }),
                      borderColor:
                        hoveredSkill === skill.name
                          ? skill.color
                          : subtleBorderColor(theme),
                      borderRadius: 3,
                      p: 3,
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      transform:
                        hoveredSkill === skill.name
                          ? "translateY(-8px)"
                          : "translateY(0)",
                      boxShadow:
                        hoveredSkill === skill.name
                          ? theme.palette.mode === "dark"
                            ? `0 10px 40px ${alpha(skill.color, 0.3)}`
                            : `0 10px 40px ${alpha(skill.color, 0.2)}`
                          : "none",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        borderRadius: 3,
                        background: `linear-gradient(135deg, ${alpha(
                          skill.color,
                          0.1
                        )}, transparent)`,
                        opacity: hoveredSkill === skill.name ? 1 : 0,
                        transition: "opacity 0.3s ease",
                      },
                    }}
                  >
                    {/* Icon */}
                    <Box
                      sx={{
                        fontSize: { xs: "2.5rem", md: "3rem" },
                        mb: 1.5,
                        color: skill.color,
                        filter:
                          hoveredSkill === skill.name
                            ? "drop-shadow(0 0 8px currentColor)"
                            : "none",
                        transition: "all 0.3s ease",
                        transform:
                          hoveredSkill === skill.name
                            ? "scale(1.15) rotateY(360deg)"
                            : "scale(1) rotateY(0)",
                      }}
                    >
                      {skill.icon}
                    </Box>

                    {/* Name */}
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        mb: 0.5,
                        color: theme.palette.text.primary,
                      }}
                    >
                      {skill.name}
                    </Typography>

                    {/* Level Badge */}
                    <Chip
                      label={skill.level}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        background: alpha(skill.color, 0.15),
                        color: skill.color,
                        border: `1px solid ${alpha(skill.color, 0.3)}`,
                        opacity: hoveredSkill === skill.name ? 1 : 0.7,
                        transition: "opacity 0.3s ease",
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Bottom CTA */}
        <HighlightPanel sx={{ mt: 8 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 1,
              color: theme.palette.text.primary,
            }}
          >
            Sempre aprendendo! 📚
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
            }}
          >
            Atualmente estudando arquitetura de microsserviços e cloud computing
          </Typography>
        </HighlightPanel>
      </Container>
    </Box>
  );
};