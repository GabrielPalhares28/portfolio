import React from "react";
import { Box, useTheme } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import { tintedPanel } from "../../theme/styles";

interface HighlightPanelProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const HighlightPanel: React.FC<HighlightPanelProps> = ({
  children,
  sx,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: 4,
        borderRadius: 3,
        textAlign: "center",
        ...tintedPanel(theme),
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};
