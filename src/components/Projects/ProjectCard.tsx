import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  useTheme,
  alpha,
} from "@mui/material";
import { GitHub, LaunchOutlined } from "@mui/icons-material";

interface ProjectProps {
  title: string;
  description: string;
  image: string;
  link: string;
  tags?: string[];
  category?: string;
}

export const ProjectCard: React.FC<ProjectProps> = ({
  title,
  description,
  image,
  link,
  tags = ["React", "TypeScript"],
  category = "Full Stack",
}) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: "relative",
        height: "100%",
        borderRadius: 4,
        overflow: "hidden",
        background:
          theme.palette.mode === "dark"
            ? "rgba(30, 41, 59, 0.5)"
            : "rgba(255, 255, 255, 0.9)",
        border: `1px solid ${
          theme.palette.mode === "dark"
            ? "rgba(148, 163, 184, 0.1)"
            : "rgba(203, 213, 225, 0.5)"
        }`,
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: isHovered
          ? theme.palette.mode === "dark"
            ? "0 20px 60px rgba(0, 0, 0, 0.4)"
            : "0 20px 60px rgba(0, 0, 0, 0.15)"
          : "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image Container */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 220,
          overflow: "hidden",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        {!imageFailed && (
          <Box
            component="img"
            src={image}
            alt={title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.4s ease",
              transform: isHovered ? "scale(1.1)" : "scale(1)",
            }}
            onError={() => {
              // Fallback (gradiente de fundo) se a imagem não carregar
              console.warn(
                `Não foi possível carregar a imagem do projeto "${title}": ${image}`
              );
              setImageFailed(true);
            }}
          />
        )}
        
        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: isHovered
              ? "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)"
              : "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 100%)",
            transition: "all 0.3s ease",
          }}
        />
        
        {/* Category Badge */}
        <Chip
          label={category}
          size="small"
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            background: alpha(theme.palette.common.white, 0.9),
            color: theme.palette.primary.main,
            fontWeight: 600,
            backdropFilter: "blur(10px)",
          }}
        />
      </Box>

      {/* Content */}
      <Box
        sx={{
          p: 3,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 1.5,
            color: theme.palette.text.primary,
            fontSize: "1.125rem",
          }}
        >
          {title}
        </Typography>
        
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            mb: 2,
            lineHeight: 1.7,
            flex: 1,
          }}
        >
          {description}
        </Typography>

        {/* Tags */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            mb: 3,
          }}
        >
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              sx={{
                background:
                  theme.palette.mode === "dark"
                    ? alpha(theme.palette.primary.main, 0.1)
                    : alpha(theme.palette.primary.main, 0.08),
                color: theme.palette.primary.main,
                fontWeight: 600,
                fontSize: "0.75rem",
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            />
          ))}
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<GitHub />}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              flex: 1,
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
              },
            }}
          >
            Ver Código
          </Button>
          
          <IconButton
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              border: `2px solid ${theme.palette.primary.main}`,
              color: theme.palette.primary.main,
              transition: "all 0.3s ease",
              "&:hover": {
                background: alpha(theme.palette.primary.main, 0.1),
                transform: "translateY(-2px)",
              },
            }}
          >
            <LaunchOutlined />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};