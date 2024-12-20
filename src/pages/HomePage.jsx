import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const HomePage = () => {
  const [events, setEvents] = useState([]); // Almacena todos los eventos
  const [expandedRows, setExpandedRows] = useState({}); // Almacena el estado de los detalles desplegados
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // Controla el diálogo de eliminación
  const [eventToDelete, setEventToDelete] = useState(null); // ID del evento a eliminar
  const navigate = useNavigate(); // Navegación entre páginas

  // Cargar eventos desde la API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "https://api-crud-mongoatlas.vercel.app/api/eventos"
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Error al obtener los eventos:", error);
      }
    };

    fetchEvents();
  }, []);

  // Manejar el despliegue de filas
  const handleToggleRow = async (eventId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));

    if (!expandedRows[eventId]) {
      try {
        const response = await axios.get(
          `https://api-crud-mongoatlas.vercel.app/api/eventos/${eventId}`
        );
        setEvents((prev) =>
          prev.map((event) =>
            event._id === eventId
              ? { ...event, details: response.data }
              : event
          )
        );
      } catch (error) {
        console.error("Error al obtener los detalles del evento:", error);
      }
    }
  };

  // Manejar la apertura del diálogo de eliminación
  const handleOpenDeleteDialog = (eventId) => {
    setEventToDelete(eventId);
    setDeleteDialogOpen(true);
  };

  // Manejar la confirmación de eliminación
  const handleDeleteEvent = async () => {
    try {
      await axios.delete(
        `https://api-crud-mongoatlas.vercel.app/api/eventos/${eventToDelete}`
      );
      setEvents((prev) => prev.filter((event) => event._id !== eventToDelete));
      setDeleteDialogOpen(false);
      setEventToDelete(null);
    } catch (error) {
      console.error("Error al eliminar el evento:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ padding: "20px" }}>
      <Typography variant="h3" gutterBottom>
        Bienvenido a la Agenda de Eventos
      </Typography>
      <Typography variant="body1" gutterBottom>
        Organiza tus eventos de manera eficiente y accede a ellos fácilmente.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/crear-evento"
        sx={{ marginBottom: "20px" }}
      >
        Crear Nuevo Evento
      </Button>

      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell><strong>Título del Evento</strong></TableCell>
              <TableCell><strong>Nombre del Organizador</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <React.Fragment key={event._id}>
                {/* Fila principal */}
                <TableRow>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleToggleRow(event._id)}
                    >
                      {expandedRows[event._id] ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>{event.titulo}</TableCell>
                  <TableCell>{event.organizador.nombre}</TableCell>
                </TableRow>

                {/* Fila desplegable */}
                <TableRow>
                  <TableCell colSpan={3} sx={{ padding: 0 }}>
                    <Collapse in={expandedRows[event._id]} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 2 }}>
                        <Typography variant="h6">Detalles del Evento:</Typography>
                        {event.details ? (
                          <Box>
                            <Typography><strong>Descripción:</strong> {event.details.descripcion}</Typography>
                            <Typography><strong>Ubicación:</strong> {event.details.ubicacion}</Typography>
                            <Typography><strong>Fecha:</strong> {event.details.fecha}</Typography>
                            <Typography><strong>Hora:</strong> {event.details.hora}</Typography>
                            <Typography><strong>Tipo:</strong> {event.details.tipo}</Typography>
                            <Box sx={{ mt: 2 }}>
                              <Button
                                variant="outlined"
                                color="primary"
                                sx={{ mr: 2 }}
                                onClick={() => navigate(`/editar-evento/${event._id}`)}
                              >
                                Editar Evento
                              </Button>
                              <Button
                                variant="outlined"
                                color="error"
                                onClick={() => handleOpenDeleteDialog(event._id)}
                              >
                                Eliminar Evento
                              </Button>
                            </Box>
                          </Box>
                        ) : (
                          <Typography>Cargando detalles...</Typography>
                        )}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo de Confirmación de Eliminación */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Eliminar Evento</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar este evento? Esta acción no se
            puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleDeleteEvent} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default HomePage;
