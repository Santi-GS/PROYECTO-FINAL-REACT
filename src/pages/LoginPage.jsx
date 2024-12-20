import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box, Alert } from "@mui/material";
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
      <Typography variant="h4" gutterBottom>
        Inicio de Sesión
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
          Iniciar Sesión
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
