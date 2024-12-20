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
  TextField,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Importar contexto de autenticación
import axios from "axios";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const HomePage = () => {
  const { isAuthenticated, logout } = useAuth(); // Usar contexto de autenticación
  const [events, setEvents] = useState([]); // Almacena todos los eventos
  const [expandedRows, setExpandedRows] = useState({}); // Almacena el estado de los detalles desplegados
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // Controla el diálogo de eliminación
  const [eventToDelete, setEventToDelete] = useState(null); // ID del evento a eliminar
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false); // Controla el diálogo de cierre de sesión
  const [searchTerm, setSearchTerm] = useState(""); // Almacena el término de búsqueda
  const [filterOption, setFilterOption] = useState("nombre"); // Almacena la opción de filtro seleccionada
  const navigate = useNavigate(); // Navegación entre páginas

  useEffect(() => {
    document.title = "Agenda de Eventos";
  }, []);
  
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

  // Función para filtrar los eventos
  const handleFilter = async () => {
    try {
      let url =
        "https://api-crud-mongoatlas.vercel.app/api/eventos/negocio/busqueda";

      // Construir la URL según la opción de filtro seleccionada
      if (filterOption === "nombre") {
        url += `?nombre=${searchTerm}`;
      } else if (filterOption === "titulo") {
        url += `?titulo=${searchTerm}`;
      } else if (filterOption === "ambos") {
        url += `?nombre=${searchTerm}&titulo=${searchTerm}`;
      }

      // Realizar la solicitud a la API
      const response = await axios.get(url);
      setEvents(response.data); // Actualizar la lista de eventos con los resultados
    } catch (error) {
      console.error("Error al filtrar los eventos:", error);
      setEvents([]); // Vaciar la lista si no hay resultados
    }
  };

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

  // Manejar la confirmación de cierre de sesión
  const handleLogoutConfirm = () => {
    logout(); // Elimina los privilegios de administrador
    setLogoutDialogOpen(false); // Cierra el diálogo
  };

  return (
    <Container maxWidth="lg" sx={{ padding: "20px" }}>
      <Typography variant="h3" gutterBottom>
        Bienvenido a la Agenda de Eventos
      </Typography>
      <Typography variant="body1" gutterBottom>
        Organiza tus eventos de manera eficiente y accede a ellos fácilmente.
      </Typography>

      {/* Botón para iniciar o cerrar sesión */}
      {isAuthenticated ? (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setLogoutDialogOpen(true)} // Abre el diálogo de cierre de sesión
          sx={{ marginBottom: "20px", marginRight: "10px" }}
        >
          Cerrar Sesión
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
          sx={{ marginBottom: "20px", marginRight: "10px" }}
        >
          Iniciar Sesión como Administrador
        </Button>
      )}

      {/* Botón para crear un nuevo evento */}
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/crear-evento"
        sx={{ marginBottom: "20px" }}
      >
        Crear Nuevo Evento
      </Button>

      {/* Filtro de búsqueda */}
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <TextField
          label="Buscar eventos"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: 1, marginRight: "10px" }}
        />
        <FormControl variant="outlined" sx={{ width: "200px", marginRight: "10px" }}>
          <Select
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
            displayEmpty
          >
            <MenuItem value="nombre">Nombre organizador</MenuItem>
            <MenuItem value="titulo">Título evento</MenuItem>
            <MenuItem value="ambos">Ambos</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleFilter}>
          Filtrar
        </Button>
      </Box>

      {/* Listado de eventos */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                <strong>Título del Evento</strong>
              </TableCell>
              <TableCell>
                <strong>Nombre del Organizador</strong>
              </TableCell>
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
                    <Collapse
                      in={expandedRows[event._id]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box sx={{ margin: 2 }}>
                        <Typography variant="h6">Detalles del Evento:</Typography>
                        <Typography>
                          <strong>Descripción:</strong> {event.descripcion}
                        </Typography>
                        <Typography>
                          <strong>Ubicación:</strong> {event.ubicacion}
                        </Typography>
                        <Typography>
                          <strong>Fecha:</strong> {event.fecha}
                        </Typography>
                        <Typography>
                          <strong>Hora:</strong> {event.hora}
                        </Typography>
                        <Typography>
                          <strong>Tipo:</strong> {event.tipo}
                        </Typography>
                        {isAuthenticated && ( // Condición para mostrar botones
                          <Box sx={{ mt: 2 }}>
                            <Button
                              variant="outlined"
                              color="primary"
                              sx={{ mr: 2 }}
                              onClick={() =>
                                navigate(`/editar-evento/${event._id}`)
                              }
                            >
                              Editar Evento
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() =>
                                handleOpenDeleteDialog(event._id)
                              }
                            >
                              Eliminar Evento
                            </Button>
                          </Box>
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

      {/* Diálogo de Confirmación de Cierre de Sesión */}
      <Dialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
      >
        <DialogTitle>Salir del Modo Administrador</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas salir del modo administrador? Perderás
            los privilegios de edición y eliminación.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleLogoutConfirm} color="error">
            Salir
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default HomePage;
