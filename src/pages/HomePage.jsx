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
  Grid,
  InputAdornment,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchIcon from "@mui/icons-material/Search";

const HomePage = () => {
  const { isAuthenticated, logout } = useAuth(); // Usar contexto de autenticación
  const [events, setEvents] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("nombre");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Agenda de Eventos";
  }, []);

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

  const handleFilter = async () => {
    try {
      let url =
        "https://api-crud-mongoatlas.vercel.app/api/eventos/negocio/busqueda";

      if (filterOption === "nombre") {
        url += `?nombre=${searchTerm}`;
      } else if (filterOption === "titulo") {
        url += `?titulo=${searchTerm}`;
      } else if (filterOption === "ambos") {
        url += `?nombre=${searchTerm}&titulo=${searchTerm}`;
      }

      const response = await axios.get(url);
      setEvents(response.data);
    } catch (error) {
      console.error("Error al filtrar los eventos:", error);
      setEvents([]);
    }
  };

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

  const handleOpenDeleteDialog = (eventId) => {
    setEventToDelete(eventId);
    setDeleteDialogOpen(true);
  };

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
    logout(); // Llama al contexto para cerrar sesión
    setLogoutDialogOpen(false); // Cierra el diálogo
  };

  return (
    <Container maxWidth="lg" sx={{ padding: "20px" }}>
      {/* Header */}
      <Grid container justifyContent="space-between" alignItems="center" mb={3}>
        <Grid item>
          <Typography
            variant="h3"
            component="h1"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#1976d2" }}
          >
            Agenda de Eventos
          </Typography>
        </Grid>
        <Grid item>
          {isAuthenticated ? (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setLogoutDialogOpen(true)} // Abre el diálogo de confirmación
            >
              Cerrar Sesión
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Iniciar Sesión
            </Button>
          )}
        </Grid>
      </Grid>

      {/* Descripción */}
      <Typography
        variant="body1"
        align="center"
        gutterBottom
        sx={{
          marginBottom: "20px",
          color: "#616161",
          fontStyle: "italic",
          padding: "10px",
          backgroundColor: "#f5f5f5",
          borderRadius: "5px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        Organiza tus eventos de manera eficiente, visualiza detalles y realiza
        cambios en tiempo real.
      </Typography>

      {/* Botón Crear Evento */}
      <Box textAlign="center" mb={3}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/crear-evento"
          sx={{
            padding: "10px 20px",
            fontSize: "1.2rem",
            fontWeight: "bold",
            backgroundColor: "#1976d2",
            ":hover": { backgroundColor: "#115293" },
          }}
        >
          Crear Nuevo Evento
        </Button>
      </Box>

      {/* Filtro */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <TextField
          label="Buscar eventos"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            flex: 1,
            backgroundColor: "white",
            borderRadius: "5px",
          }}
        />
        <FormControl variant="outlined" sx={{ width: "200px" }}>
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleFilter}
          sx={{
            backgroundColor: "#1976d2",
            ":hover": { backgroundColor: "#115293" },
          }}
        >
          Filtrar
        </Button>
      </Box>

      {/* Listado de Eventos */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell
                sx={{ fontWeight: "bold", color: "#424242", fontSize: "1.1rem" }}
              >
                Título del Evento
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", color: "#424242", fontSize: "1.1rem" }}
              >
                Nombre del Organizador
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event, index) => (
              <React.Fragment key={event._id}>
                <TableRow
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
                    ":hover": { backgroundColor: "#e0f7fa" },
                  }}
                >
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
                        {isAuthenticated && (
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
