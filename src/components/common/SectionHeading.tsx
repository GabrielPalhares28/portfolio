import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import { headingGradientText } from "../../theme/styles";

interface SectionHeadingProps {
  overline: string;
  title: string;
  subtitle?: string;
  sx?: SxProps<Theme>;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  overline,
  title,
  subtitle,
  sx,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ textAlign: "center", mb: 8, ...sx }}>
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
        {overline}
      </Typography>
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: "2rem", md: "3rem" },
          fontWeight: 800,
          mb: 2,
          ...headingGradientText(theme),
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.text.secondary,
            maxWidth: "600px",
            mx: "auto",
            fontSize: { xs: "1rem", md: "1.125rem" },
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};
