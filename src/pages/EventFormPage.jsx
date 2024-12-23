import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Paper,
} from "@mui/material";
import axios from "axios";

const EventFormPage = () => {
  const { id } = useParams(); // Obtener el ID del evento (si existe)
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    ubicacion: "",
    fecha: "",
    hora: "",
    organizador: {
      nombre: "",
      correo: "",
      telefono: "",
    },
    tipo: "",
  });

  const [initialFormData, setInitialFormData] = useState(null); // Para comparar cambios
  const [loading, setLoading] = useState(false); // Indicador de carga
  const [error, setError] = useState(null); // Mensaje de error
  const [dialogOpen, setDialogOpen] = useState(false); // Controla el diálogo de confirmación

  // Cargar datos del evento si estamos en modo edición
  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://api-crud-mongoatlas.vercel.app/api/eventos/${id}`
          );
          setFormData(response.data);
          setInitialFormData(response.data); // Guardar datos iniciales
        } catch (err) {
          setError("Error al cargar los datos del evento.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchEvent();
    } else {
      setInitialFormData({ ...formData }); // Guardar el estado inicial del formulario vacío
    }
  }, [id]);

  // Manejar los cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Definir límites personalizado de caracteres
  const limits = {
    titulo: 100,
    descripcion: 300,
    ubicacion: 150,
    tipo: 50,
    "organizador.nombre": 80,
    "organizador.correo": 80,
    "organizador.telefono": 15,
  };

  if (value.length > (limits[name] || Infinity)) {
    return; // Ignorar si se supera el límite
  }

    if (name.includes("organizador.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        organizador: {
          ...prev.organizador,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Verificar si hay cambios en el formulario
  const hasUnsavedChanges = () => {
    return JSON.stringify(formData) !== JSON.stringify(initialFormData);
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        // Modo edición
        await axios.put(
          `https://api-crud-mongoatlas.vercel.app/api/eventos/${id}`,
          formData
        );
      } else {
        // Modo creación
        await axios.post(
          `https://api-crud-mongoatlas.vercel.app/api/eventos`,
          formData
        );
      }
      navigate("/"); // Redirigir a la página principal
    } catch (err) {
      setError("Error al guardar los datos del evento.");
      console.error(err);
    }
  };

  // Manejar la navegación al HomePage con confirmación
  const handleBackNavigation = () => {
    if (hasUnsavedChanges()) {
      setDialogOpen(true); // Mostrar el diálogo de confirmación
    } else {
      navigate("/"); // Navegar directamente si no hay cambios
    }
  };

  // Confirmar la salida sin guardar cambios
  const confirmBackNavigation = () => {
    setDialogOpen(false);
    navigate("/");
  };

  return (
    <Container maxWidth="md" sx={{ padding: "20px" }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: "bold", color: "#1976d2" }}
          >
            {id ? "Editar Evento" : "Crear Nuevo Evento"}
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleBackNavigation}
          >
            Volver
          </Button>
        </Box>

        {loading ? (
          <Box textAlign="center" mt={3}>
            <CircularProgress />
            <Typography mt={2}>Cargando datos del evento...</Typography>
          </Box>
        ) : (
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <TextField
              label="Título"
              name="titulo"
              value={formData.titulo}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Descripción"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
              multiline
              rows={3}
            />
            <TextField
              label="Ubicación"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <Box display="flex" gap={2}>
              <TextField
                label="Fecha"
                name="fecha"
                type="date"
                value={formData.fecha}
                onChange={handleInputChange}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Hora"
                name="hora"
                type="time"
                value={formData.hora}
                onChange={handleInputChange}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <TextField
              label="Tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              Información del Organizador
            </Typography>
            <TextField
              label="Nombre del Organizador"
              name="organizador.nombre"
              value={formData.organizador.nombre}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Correo del Organizador"
              name="organizador.correo"
              value={formData.organizador.correo}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Teléfono del Organizador"
              name="organizador.telefono"
              value={formData.organizador.telefono}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <Box textAlign="right" mt={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  padding: "10px 20px",
                  fontSize: "1.1rem",
                  backgroundColor: "#1976d2",
                  ":hover": { backgroundColor: "#115293" },
                }}
              >
                {id ? "Guardar Cambios" : "Crear Evento"}
              </Button>
            </Box>
          </Box>
        )}

        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}
      </Paper>

      {/* Diálogo de confirmación */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirmación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {id
              ? "Tienes cambios sin guardar. ¿Deseas salir y perder los cambios?"
              : "Tienes información cargada. ¿Deseas salir y abandonar el formulario?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button onClick={confirmBackNavigation} color="error">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EventFormPage;
