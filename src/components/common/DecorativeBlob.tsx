import React from "react";
import { Box, useTheme } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";

interface DecorativeBlobProps {
  /** Base color as an "r, g, b" triple. */
  color?: string;
  darkColor?: string;
  lightColor?: string;
  darkOpacity?: number;
  lightOpacity?: number;
  size: number | string;
  blur?: number;
  sx?: SxProps<Theme>;
}

export const DecorativeBlob: React.FC<DecorativeBlobProps> = ({
  color = "102, 126, 234",
  darkColor = color,
  lightColor = color,
  darkOpacity = 0.1,
  lightOpacity = 0.05,
  size,
  blur = 60,
  sx,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const rgb = isDark ? darkColor : lightColor;
  const opacity = isDark ? darkOpacity : lightOpacity;

  return (
    <Box
      sx={{
        position: "absolute",
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(${rgb}, ${opacity}) 0%, transparent 70%)`,
        borderRadius: "50%",
        filter: `blur(${blur}px)`,
        pointerEvents: "none",
        ...sx,
      }}
    />
  );
};
