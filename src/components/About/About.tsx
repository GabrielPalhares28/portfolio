import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Avatar,
  useTheme,
  alpha,
  LinearProgress,
  Chip,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  School,
  Work,
  Code,
  EmojiEvents,
  Favorite,
  Psychology,
} from "@mui/icons-material";
import { DecorativeBlob } from "../common/DecorativeBlob";
import { SectionHeading } from "../common/SectionHeading";
import { SubsectionHeading } from "../common/SubsectionHeading";
import {
  BRAND_GRADIENT,
  SURFACE_COLORS,
  fadeIn,
  pulse,
  sectionGradient,
  subtleBorderColor,
  surface,
} from "../../theme/styles";

const experiences = [
  {
    year: "2024 - Atual",
    title: "Desenvolvedor Full Stack Freelancer",
    company: "Workana",
    description:
      "Desenvolvimento de soluções completas integrando front-end e back-end, com foco em React, Node.js e bancos relacionais.",
    icon: <Work />,
    color: "#667eea",
  },
  {
    year: "2023 - 2024",
    title: "Desenvolvedor Backend",
    company: "Projetos Acadêmicos",
    description:
      "Desenvolvimento de sistemas como alocação de animais em zoológico e sistema de chamados com Java/Spring Boot.",
    icon: <Code />,
    color: "#764ba2",
  },
  {
    year: "2023 - Atual",
    title: "Análise e Desenvolvimento de Sistemas",
    company: "Unicesumar",
    description:
      "Graduação com foco em desenvolvimento de software, arquitetura de sistemas e boas práticas de programação.",
    icon: <School />,
    color: "#f59e0b",
  },
];

const skills = [
  { name: "React & TypeScript", level: 90 },
  { name: "Node.js & Express", level: 85 },
  { name: "Java & Spring Boot", level: 75 },
  { name: "PostgreSQL & MySQL", level: 80 },
  { name: "Git & DevOps", level: 85 },
  { name: "UI/UX Design", level: 70 },
];

const interests = [
  { icon: <Code />, label: "Clean Code", color: "#3b82f6" },
  { icon: <Psychology />, label: "Problem Solving", color: "#8b5cf6" },
  { icon: <EmojiEvents />, label: "Desafios", color: "#f59e0b" },
  { icon: <Favorite />, label: "Open Source", color: "#ec4899" },
];

export const About: React.FC = () => {
  const theme = useTheme();
  const [hoveredExp, setHoveredExp] = useState<number | null>(null);

  return (
    <Box
      id="about"
      sx={{
        py: { xs: 8, md: 12 },
        position: "relative",
        background: sectionGradient(theme, {
          dark: [SURFACE_COLORS.darkSoft, SURFACE_COLORS.darkDeep],
          light: [SURFACE_COLORS.lightPlain, SURFACE_COLORS.lightSoft],
        }),
      }}
    >
      {/* Background Decoration */}
      <DecorativeBlob
        size="350px"
        darkOpacity={0.08}
        lightOpacity={0.04}
        sx={{ bottom: "20%", right: "5%" }}
      />

      <Container maxWidth="lg">
        <SectionHeading overline="CONHEÇA-ME MELHOR" title="Sobre Mim" />

        {/* Hero Section - Profile & Intro */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: { xs: 4, md: 8 },
            mb: 10,
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            ...surface(theme, { light: 0.8 }),
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Avatar with Animation */}
          <Box
            sx={{
              position: "relative",
              ...fadeIn({ direction: "left", duration: 0.8 }),
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: -8,
                borderRadius: "50%",
                background: BRAND_GRADIENT,
                opacity: 0.3,
                filter: "blur(20px)",
                ...pulse({ base: 0.3, peak: 0.5, duration: 3 }),
              }}
            />
            <Avatar
              src="/assets/images/profile.jpg"
              alt="Gabriel Palhares"
              sx={{
                width: { xs: 160, md: 200 },
                height: { xs: 160, md: 200 },
                border: `4px solid ${
                  theme.palette.mode === "dark"
                    ? alpha(theme.palette.primary.main, 0.3)
                    : alpha(theme.palette.primary.main, 0.2)
                }`,
                position: "relative",
              }}
              onError={(e) => {
                // Fallback com iniciais
                (e.target as HTMLImageElement).src = "";
              }}
            >
              GP
            </Avatar>
          </Box>

          {/* Text Content */}
          <Box
            sx={{
              flex: 1,
              textAlign: { xs: "center", md: "left" },
              ...fadeIn({ direction: "right", duration: 0.8, delay: 0.2 }),
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: theme.palette.text.primary,
              }}
            >
              Olá, sou Gabriel Palhares! 👋
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                lineHeight: 1.8,
                fontSize: "1.05rem",
                mb: 3,
              }}
            >
              Desenvolvedor <strong>Full-Stack</strong> apaixonado por criar soluções digitais
              que fazem diferença. Com experiência em <strong>React, Node.js, Java</strong> e
              bancos de dados relacionais, busco sempre entregar código limpo e sistemas
              escaláveis.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                lineHeight: 1.8,
                fontSize: "1.05rem",
              }}
            >
              Formado em <strong>Análise e Desenvolvimento de Sistemas</strong> na
              Unicesumar e atuo como Desenvolvedor Full Stack, onde desenvolvo projetos completos
              do front ao back-end.
            </Typography>

            {/* Quick Stats */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 3,
                mt: 4,
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: "#667eea" }}>
                  2+
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Anos de Experiência
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: "#764ba2" }}>
                  10+
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Projetos Concluídos
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: "#f59e0b" }}>
                  100%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Dedicação
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Timeline Section */}
        <Box sx={{ mb: 10 }}>
          <SubsectionHeading>Trajetória Profissional</SubsectionHeading>
          <Box sx={{ position: "relative" }}>
            {/* Timeline Line */}
            <Box
              sx={{
                position: "absolute",
                left: { xs: 20, md: "50%" },
                top: 0,
                bottom: 0,
                width: 2,
                background: `linear-gradient(180deg, ${alpha(
                  theme.palette.primary.main,
                  0.5
                )}, ${alpha(theme.palette.primary.main, 0.1)})`,
                display: { xs: "block", md: "block" },
              }}
            />

            {experiences.map((exp, index) => (
              <Box
                key={index}
                onMouseEnter={() => setHoveredExp(index)}
                onMouseLeave={() => setHoveredExp(null)}
                sx={{
                  display: "flex",
                  justifyContent: index % 2 === 0 ? "flex-start" : "flex-end",
                  mb: 4,
                  position: "relative",
                  ...fadeIn({ delay: index * 0.2 }),
                }}
              >
                {/* Timeline Dot */}
                <Box
                  sx={{
                    position: "absolute",
                    left: { xs: 12, md: "calc(50% - 8px)" },
                    top: 20,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: exp.color,
                    border: `3px solid ${
                      theme.palette.mode === "dark" ? "#0f172a" : "#ffffff"
                    }`,
                    boxShadow: `0 0 20px ${alpha(exp.color, 0.6)}`,
                    zIndex: 1,
                    transform: hoveredExp === index ? "scale(1.3)" : "scale(1)",
                    transition: "transform 0.3s ease",
                  }}
                />

                <Card
                  sx={{
                    width: { xs: "calc(100% - 60px)", md: "45%" },
                    ml: { xs: 7, md: 0 },
                    ...surface(theme, { dark: 0.6 }),
                    borderColor:
                      hoveredExp === index ? exp.color : "transparent",
                    transition: "all 0.3s ease",
                    transform:
                      hoveredExp === index ? "translateY(-4px)" : "translateY(0)",
                    boxShadow:
                      hoveredExp === index
                        ? `0 8px 30px ${alpha(exp.color, 0.3)}`
                        : "none",
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <Box sx={{ color: exp.color }}>{exp.icon}</Box>
                      <Chip
                        label={exp.year}
                        size="small"
                        sx={{
                          background: alpha(exp.color, 0.15),
                          color: exp.color,
                          fontWeight: 600,
                          border: `1px solid ${alpha(exp.color, 0.3)}`,
                        }}
                      />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {exp.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      {exp.company}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        lineHeight: 1.6,
                      }}
                    >
                      {exp.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Skills Section */}
        <Box sx={{ mb: 10 }}>
          <SubsectionHeading sx={{ mb: 5 }}>
            Níveis de Proficiência
          </SubsectionHeading>
          <Grid container spacing={3}>
            {skills.map((skill, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box sx={fadeIn({ delay: index * 0.1 })}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                    >
                      {skill.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 700, color: theme.palette.primary.main }}
                    >
                      {skill.level}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={skill.level}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      background: subtleBorderColor(theme),
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 4,
                        background:
                          "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                      },
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Interests Section */}
        <Box>
          <SubsectionHeading>O que me motiva</SubsectionHeading>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: 3,
            }}
          >
            {interests.map((interest, index) => (
              <Box
                key={index}
                sx={{
                  textAlign: "center",
                  p: 3,
                  borderRadius: 3,
                  ...surface(theme, { light: 0.8 }),
                  transition: "all 0.3s ease",
                  ...fadeIn({ delay: index * 0.15 }),
                  "&:hover": {
                    transform: "translateY(-8px)",
                    borderColor: interest.color,
                    boxShadow: `0 8px 30px ${alpha(interest.color, 0.3)}`,
                  },
                }}
              >
                <Box
                  sx={{
                    color: interest.color,
                    mb: 1,
                    fontSize: "2.5rem",
                  }}
                >
                  {interest.icon}
                </Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                >
                  {interest.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};