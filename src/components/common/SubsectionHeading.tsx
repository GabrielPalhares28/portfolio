import React from "react";
import { Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";

interface SubsectionHeadingProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const SubsectionHeading: React.FC<SubsectionHeadingProps> = ({
  children,
  sx,
}) => (
  <Typography
    variant="h4"
    sx={{
      fontWeight: 700,
      mb: 4,
      textAlign: "center",
      color: "text.primary",
      ...sx,
    }}
  >
    {children}
  </Typography>
);
