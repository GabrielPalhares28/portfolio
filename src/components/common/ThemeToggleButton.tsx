import React from "react";
import { IconButton } from "@mui/material";
import type { PaletteMode, SxProps, Theme } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { accentBackground } from "../../theme/styles";

interface ThemeToggleButtonProps {
  mode: PaletteMode;
  onToggle: () => void;
  sx?: SxProps<Theme>;
}

export const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
  mode,
  onToggle,
  sx,
}) => (
  <IconButton
    onClick={onToggle}
    aria-label="Alternar tema"
    sx={{ background: accentBackground(mode), ...sx }}
  >
    {mode === "dark" ? (
      <Brightness7 sx={{ color: "#fbbf24" }} />
    ) : (
      <Brightness4 sx={{ color: "#6366f1" }} />
    )}
  </IconButton>
);
