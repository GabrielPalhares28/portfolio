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
import {
  Email,
  GitHub,
  LinkedIn,
  WhatsApp,
  Send,
  CheckCircle,
} from "@mui/icons-material";
import axios from "axios";

const contactMethods = [
  {
    icon: <Email />,
    title: "Email",
    value: "gabriel@email.com",
    href: "mailto:gabrielpalhares764@email.com",
    color: "#ea4335",
  },
  {
    icon: <LinkedIn />,
    title: "LinkedIn",
    value: "/gabriel-palhares",
    href: "https://linkedin.com/in/gabriel-palhares-94bb30204",
    color: "#0077b5",
  },
  {
    icon: <GitHub />,
    title: "GitHub",
    value: "@GabrielPalhares28",
    href: "https://github.com/GabrielPalhares28",
    color: "#333",
  },
  {
    icon: <WhatsApp />,
    title: "WhatsApp",
    value: "+55 (64) 99298-0763",
    href: "https://wa.me/qr/JQBBZIED4SPBB1",
    color: "#25d366",
  },
];

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
    } catch (error: any) {
      console.error('Erro ao enviar mensagem:', error);

      let errorMessage = "Erro ao enviar mensagem. Tente novamente! 😕";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 429) {
        errorMessage = "Muitas tentativas. Aguarde um momento e tente novamente.";
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
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)"
            : "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
      }}
    >
      {/* Background Decoration */}
      <Box
        sx={{
          position: "absolute",
          top: "30%",
          left: "10%",
          width: "300px",
          height: "300px",
          background:
            theme.palette.mode === "dark"
              ? "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
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
            VAMOS CONVERSAR
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
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
            Entre em Contato
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: "600px",
              mx: "auto",
              fontSize: { xs: "1rem", md: "1.125rem" },
            }}
          >
            Tem um projeto em mente? Vamos construir algo incrível juntos!
          </Typography>
        </Box>

        <Grid container spacing={6}>
          {/* Contact Methods */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                animation: "fadeInLeft 0.8s ease-out",
                "@keyframes fadeInLeft": {
                  from: { opacity: 0, transform: "translateX(-30px)" },
                  to: { opacity: 1, transform: "translateX(0)" },
                },
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
                Outras formas de contato
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {contactMethods.map((method, index) => (
                  <Card
                    key={index}
                    component="a"
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      textDecoration: "none",
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(30, 41, 59, 0.5)"
                          : "rgba(255, 255, 255, 0.9)",
                      border: `1px solid ${
                        theme.palette.mode === "dark"
                          ? "rgba(148, 163, 184, 0.1)"
                          : "rgba(203, 213, 225, 0.5)"
                      }`,
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
                          {method.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                          }}
                        >
                          {method.value}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>

              {/* Additional Info */}
              <Box
                sx={{
                  mt: 4,
                  p: 3,
                  borderRadius: 3,
                  background:
                    theme.palette.mode === "dark"
                      ? alpha(theme.palette.primary.main, 0.05)
                      : alpha(theme.palette.primary.main, 0.03),
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                }}
              >
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
              </Box>
            </Box>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                animation: "fadeInRight 0.8s ease-out 0.2s both",
                "@keyframes fadeInRight": {
                  from: { opacity: 0, transform: "translateX(30px)" },
                  to: { opacity: 1, transform: "translateX(0)" },
                },
              }}
            >
              <Box
                component="form"
                onSubmit={sendEmail}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 4,
                  background:
                    theme.palette.mode === "dark"
                      ? "rgba(30, 41, 59, 0.5)"
                      : "rgba(255, 255, 255, 0.9)",
                  border: `1px solid ${
                    theme.palette.mode === "dark"
                      ? "rgba(148, 163, 184, 0.1)"
                      : "rgba(203, 213, 225, 0.5)"
                  }`,
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
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: 600,
                      textTransform: "none",
                      borderRadius: 2,
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 25px rgba(102, 126, 234, 0.6)",
                      },
                      "&:disabled": {
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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