import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Proveedor de autenticación
import theme from "./theme";
import HomePage from "./pages/HomePage";
import EventFormPage from "./pages/EventFormPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/crear-evento" element={<EventFormPage />} />
            <Route path="/editar-evento/:id" element={<EventFormPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
