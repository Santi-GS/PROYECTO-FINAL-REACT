import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventFormPage from "./pages/EventFormPage"; // Componente unificado

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/crear-evento" element={<EventFormPage />} />
          <Route path="/editar-evento/:id" element={<EventFormPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
