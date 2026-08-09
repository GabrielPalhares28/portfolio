import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useTheme,
  alpha,
  Snackbar,
  Alert,
  CircularProgress,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Send, CheckCircle } from "@mui/icons-material";
import axios from "axios";
import { DecorativeBlob } from "../common/DecorativeBlob";
import { HighlightPanel } from "../common/HighlightPanel";
import { SectionHeading } from "../common/SectionHeading";
import { socialLinks } from "../../data/social";
import {
  SURFACE_COLORS,
  fadeIn,
  gradientButton,
  sectionGradient,
  surface,
} from "../../theme/styles";

export const Contact: React.FC = () => {
  const theme = useTheme();
  
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  
  const [errors, setErrors] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      user_name: "",
      user_email: "",
      message: "",
    };

    if (!formData.user_name.trim()) {
      newErrors.user_name = "Nome é obrigatório";
    } else if (formData.user_name.trim().length < 3) {
      newErrors.user_name = "Nome deve ter pelo menos 3 caracteres";
    }

    if (!formData.user_email.trim()) {
      newErrors.user_email = "Email é obrigatório";
    } else if (!validateEmail(formData.user_email)) {
      newErrors.user_email = "Email inválido";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Mensagem é obrigatória";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Mensagem deve ter pelo menos 10 caracteres";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpa erro do campo ao digitar
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // URL da API (funciona automaticamente em local e production)
      const apiUrl = import.meta.env.VITE_API_URL || '';
      
      // Adaptar os nomes dos campos para a API
      const payload = {
        name: formData.user_name,
        email: formData.user_email,
        subject: "Nova mensagem do portfólio",
        message: formData.message,
      };

      const response = await axios.post(`${apiUrl}/api/send-email`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        setSnackbar({
          open: true,
          message: "Mensagem enviada com sucesso! 🎉",
          severity: "success",
        });

        // Limpa o formulário
        setFormData({
          user_name: "",
          user_email: "",
          message: "",
        });
      }
    } catch (error: unknown) {
      console.error('Erro ao enviar mensagem:', error);

      let errorMessage = "Erro ao enviar mensagem. Tente novamente! 😕";

      if (axios.isAxiosError<{ message?: string }>(error)) {
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response?.status === 429) {
          errorMessage =
            "Muitas tentativas. Aguarde um momento e tente novamente.";
        }
      }

      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 8, md: 12 },
        position: "relative",
        background: sectionGradient(theme, {
          dark: [SURFACE_COLORS.darkDeep, SURFACE_COLORS.darkSoft],
          light: [SURFACE_COLORS.lightPlain, SURFACE_COLORS.lightSoft],
        }),
      }}
    >
      {/* Background Decoration */}
      <DecorativeBlob
        size="300px"
        color="139, 92, 246"
        lightOpacity={0.05}
        sx={{ top: "30%", left: "10%" }}
      />

      <Container maxWidth="lg">
        <SectionHeading
          overline="VAMOS CONVERSAR"
          title="Entre em Contato"
          subtitle="Tem um projeto em mente? Vamos construir algo incrível juntos!"
        />

        <Grid container spacing={6}>
          {/* Contact Methods */}
          <Grid item xs={12} md={5}>
            <Box sx={fadeIn({ direction: "left", duration: 0.8 })}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  color: theme.palette.text.primary,
                }}
              >
                Outras formas de contato
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {socialLinks.map((method) => (
                  <Card
                    key={method.label}
                    component="a"
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      textDecoration: "none",
                      ...surface(theme),
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateX(8px)",
                        borderColor: method.color,
                        boxShadow: `0 4px 20px ${alpha(method.color, 0.3)}`,
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        p: 2.5,
                        "&:last-child": { pb: 2.5 },
                      }}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: alpha(method.color, 0.1),
                          color: method.color,
                        }}
                      >
                        {method.icon}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: theme.palette.text.secondary,
                            fontSize: "0.75rem",
                            mb: 0.25,
                          }}
                        >
                          {method.label}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                          }}
                        >
                          {method.handle}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>

              {/* Additional Info */}
              <HighlightPanel sx={{ mt: 4, p: 3, borderRadius: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    lineHeight: 1.7,
                  }}
                >
                  💡 <strong>Dica:</strong> Respondo mais rápido por WhatsApp e
                  LinkedIn!
                </Typography>
              </HighlightPanel>
            </Box>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Box
              sx={fadeIn({ direction: "right", duration: 0.8, delay: 0.2 })}
            >
              <Box
                component="form"
                onSubmit={sendEmail}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 4,
                  ...surface(theme),
                  backdropFilter: "blur(10px)",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    color: theme.palette.text.primary,
                  }}
                >
                  Envie uma mensagem
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <TextField
                    label="Nome completo"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                    error={!!errors.user_name}
                    helperText={errors.user_name}
                    fullWidth
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  />

                  <TextField
                    label="E-mail"
                    name="user_email"
                    type="email"
                    value={formData.user_email}
                    onChange={handleChange}
                    error={!!errors.user_email}
                    helperText={errors.user_email}
                    fullWidth
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  />

                  <TextField
                    label="Mensagem"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    error={!!errors.message}
                    helperText={errors.message || "Conte-me sobre seu projeto ou ideia"}
                    fullWidth
                    required
                    multiline
                    rows={6}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    endIcon={
                      loading ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <Send />
                      )
                    }
                    sx={{
                      ...gradientButton,
                      py: 1.5,
                      fontSize: "1rem",
                      "&:disabled": {
                        background: gradientButton.background,
                        opacity: 0.6,
                      },
                    }}
                  >
                    {loading ? "Enviando..." : "Enviar Mensagem"}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          icon={snackbar.severity === "success" ? <CheckCircle /> : undefined}
          sx={{
            width: "100%",
            fontSize: "1rem",
            fontWeight: 600,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};