import React, { useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import { OpenInNew } from "@mui/icons-material";

interface CertificateCardProps {
  title: string;
  institution: string;
  date: string;
  image: string;
  certificate: string;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({
  title,
  institution,
  date,
  image,
  certificate,
}) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      component="a"
      href={certificate}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        textDecoration: "none",
        color: "inherit",
        borderRadius: 4,
        overflow: "hidden",
        cursor: "pointer",

        background:
          theme.palette.mode === "dark"
            ? "rgba(30, 41, 59, 0.5)"
            : "rgba(255, 255, 255, 0.9)",

        border: `1px solid ${
          isHovered
            ? alpha(theme.palette.primary.main, 0.4)
            : theme.palette.mode === "dark"
              ? "rgba(148, 163, 184, 0.1)"
              : "rgba(203, 213, 225, 0.5)"
        }`,

        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",

        transform: isHovered
          ? "translateY(-6px)"
          : "translateY(0)",

        boxShadow: isHovered
          ? theme.palette.mode === "dark"
            ? "0 16px 40px rgba(0, 0, 0, 0.35)"
            : "0 16px 40px rgba(0, 0, 0, 0.12)"
          : "none",
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: 180,
          overflow: "hidden",
          background:
            theme.palette.mode === "dark"
              ? "#0f172a"
              : "#f8fafc",
        }}
      >
        <Box
          component="img"
          src={image}
          alt={`Certificado ${title}`}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.35s ease",
            transform: isHovered
              ? "scale(1.04)"
              : "scale(1)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,

            background: isHovered
              ? "rgba(15, 23, 42, 0.18)"
              : "transparent",

            transition: "background 0.3s ease",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 12,
            right: 12,

            width: 36,
            height: 36,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            borderRadius: "50%",

            background: alpha(
              theme.palette.common.white,
              0.9
            ),

            color: theme.palette.primary.main,

            opacity: isHovered ? 1 : 0,
            transform: isHovered
              ? "translateY(0)"
              : "translateY(-6px)",

            transition: "all 0.3s ease",
          }}
        >
          <OpenInNew fontSize="small" />
        </Box>
      </Box>

      <Box
        sx={{
          p: 2.5,
          flex: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: "1rem",
            mb: 1,
            color: theme.palette.text.primary,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 600,
            mb: 0.5,
          }}
        >
          {institution}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            fontSize: "0.85rem",
          }}
        >
          {date}
        </Typography>
      </Box>
    </Box>
  );
};