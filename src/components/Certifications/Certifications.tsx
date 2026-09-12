import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";

import { CertificateCard } from "./CertificateCard";

const certificates = [
  {
    title: "Git and Terminal",
    institution: "Mate Academy",
    date: "Setembro de 2026",
    image: "/certificates/git-terminal.png",
    certificate: "/certificates/git-terminal.pdf",
  },

  {
    title: "HTML + CSS Basics",
    institution: "Mate Academy",
    date: "Setembro de 2026",
    image: "/certificates/html-css-basics.png",
    certificate: "/certificates/html-css-basics.pdf",
  },

  {
    title: "JavaScript Basics Extended",
    institution: "Mate Academy",
    date: "Agosto de 2026",
    image: "/certificates/javascript-basics-extended.png",
    certificate:
      "/certificates/javascript-basics-extended.pdf",
  },
];

export const Certifications: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      id="certifications"
      sx={{
        py: { xs: 8, md: 12 },

        position: "relative",

        overflow: "hidden",

        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)"
            : "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
      }}
    >
      <Box
        sx={{
          position: "absolute",

          top: "15%",
          right: "-5%",

          width: 350,
          height: 350,

          borderRadius: "50%",

          background:
            theme.palette.mode === "dark"
              ? "radial-gradient(circle, rgba(102, 126, 234, 0.08) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(102, 126, 234, 0.04) 0%, transparent 70%)",

          filter: "blur(70px)",

          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: "center",
            mb: 7,
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
            CERTIFICAÇÕES
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: "2rem",
                md: "3rem",
              },

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
            Formação e Certificados
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,

              maxWidth: 620,

              mx: "auto",

              fontSize: {
                xs: "1rem",
                md: "1.125rem",
              },

              fontWeight: 400,
            }}
          >
            Certificações conquistadas ao longo dos meus
            estudos e da minha formação em desenvolvimento
            de software.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {certificates.map((certificate, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={certificate.title}
            >
              <Box
                sx={{
                  height: "100%",

                  animation: `fadeInUp 0.6s ease-out ${
                    index * 0.12
                  }s both`,

                  "@keyframes fadeInUp": {
                    from: {
                      opacity: 0,
                      transform: "translateY(24px)",
                    },

                    to: {
                      opacity: 1,
                      transform: "translateY(0)",
                    },
                  },
                }}
              >
                <CertificateCard {...certificate} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};