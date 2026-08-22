import React, { useState } from "react";
import { Box, Typography, Container, useTheme, alpha } from "@mui/material";
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

// Organização por categorias
const skillCategories = [
  {
    title: "Frontend",
    icon: <Code />,
    color: "#667eea",
    skills: [
      { name: "React", icon: <SiReact />, color: "#61DAFB"},
      { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6"}, 
      { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E"},
      { name: "Angular", icon: <SiAngular />, color: "#DD0031"},
      { name: "HTML5", icon: <SiHtml5 />, color: "#E34F26"},
      { name: "CSS3", icon: <SiCss3 />, color: "#1572B6"},
    ],
  },
  {
    title: "Backend",
    icon: <Storage />,
    color: "#764ba2",
    skills: [
      { name: "Node.js", icon: <SiNodedotjs />, color: "#68A063"},
      { name: "Java", icon: <SiOpenjdk />, color: "#E76F00"},
      { name: "Spring Boot", icon: <SiSpringboot />, color: "#6DB33F"},
      { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791"},
      { name: "MySQL", icon: <SiMysql />, color: "#00758F"},
    ],
  },
  {
    title: "DevOps & Tools",
    icon: <Build />,
    color: "#f59e0b",
    skills: [
      { name: "Git", icon: <SiGit />, color: "#F05032"},
      { name: "Docker", icon: <SiDocker />, color: "#0db7ed"},
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
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)"
            : "linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%)",
      }}
    >
      {/* Background Decoration */}
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: "300px",
          height: "300px",
          background:
            theme.palette.mode === "dark"
              ? "radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(102, 126, 234, 0.05) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg">
        {/* Header */}
        <Box
          sx={{
            textAlign: "center",
            mb: 8,
          }}
        >
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
            TECH STACK
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
            Habilidades Técnicas
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
            Tecnologias e ferramentas que domino para criar soluções completas
          </Typography>
        </Box>

        {/* Skills by Category */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {skillCategories.map((category, categoryIndex) => (
            <Box
              key={categoryIndex}
              sx={{
                animation: `fadeInUp 0.6s ease-out ${categoryIndex * 0.2}s both`,
                "@keyframes fadeInUp": {
                  from: { opacity: 0, transform: "translateY(30px)" },
                  to: { opacity: 1, transform: "translateY(0)" },
                },
              }}
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
                  sx={{
                    fontWeight: 700,
                    color:
                      theme.palette.mode === "dark"
                        ? theme.palette.text.primary
                        : theme.palette.text.primary,
                  }}
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
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(30, 41, 59, 0.5)"
                          : "rgba(255, 255, 255, 0.8)",
                      border: `1px solid`,
                      borderColor:
                        hoveredSkill === skill.name
                          ? skill.color
                          : theme.palette.mode === "dark"
                          ? "rgba(148, 163, 184, 0.1)"
                          : "rgba(203, 213, 225, 0.5)",
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
                        color:
                          theme.palette.mode === "dark"
                            ? theme.palette.text.primary
                            : theme.palette.text.primary,
                      }}
                    >
                      {skill.name}
                    </Typography>

                    
                      
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Bottom CTA */}
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
        </Box>
      </Container>
    </Box>
  );
};