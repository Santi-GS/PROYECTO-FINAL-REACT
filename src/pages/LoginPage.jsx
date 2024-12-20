import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Paper,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!login(username, password)) {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ padding: "20px", mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 3 }}>
        {/* Título */}
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1976d2" }}
        >
          Inicio de Sesión
        </Typography>

        {/* Subtítulo */}
        <Typography
          variant="body1"
          align="center"
          gutterBottom
          sx={{
            color: "#616161",
            fontStyle: "italic",
            marginBottom: "20px",
          }}
        >
          Al iniciar sesión se le otorgarán privilegios de administrador para
          editar y eliminar eventos.
        </Typography>

        {/* Mensaje de error */}
        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}

        {/* Formulario */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              padding: "10px 20px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              backgroundColor: "#1976d2",
              ":hover": { backgroundColor: "#115293" },
            }}
          >
            Iniciar Sesión
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
