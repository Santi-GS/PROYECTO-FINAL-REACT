import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEvent } from "../redux/slices/eventSlice";

const EventForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    ubicacion: "",
    fecha: "",
    hora: "",
    tipo: "",
    organizador: {
      nombre: "",
      correo: "",
      telefono: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("organizador.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        organizador: { ...prev.organizador, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addEvent(formData));
    setFormData({
      titulo: "",
      descripcion: "",
      ubicacion: "",
      fecha: "",
      hora: "",
      tipo: "",
      organizador: { nombre: "", correo: "", telefono: "" },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="titulo" placeholder="Título" value={formData.titulo} onChange={handleInputChange} />
      <textarea name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleInputChange} />
      <input name="ubicacion" placeholder="Ubicación" value={formData.ubicacion} onChange={handleInputChange} />
      <input type="date" name="fecha" value={formData.fecha} onChange={handleInputChange} />
      <input type="time" name="hora" value={formData.hora} onChange={handleInputChange} />
      <input name="tipo" placeholder="Tipo" value={formData.tipo} onChange={handleInputChange} />
      <input name="organizador.nombre" placeholder="Organizador - Nombre" value={formData.organizador.nombre} onChange={handleInputChange} />
      <input name="organizador.correo" placeholder="Organizador - Correo" value={formData.organizador.correo} onChange={handleInputChange} />
      <input name="organizador.telefono" placeholder="Organizador - Teléfono" value={formData.organizador.telefono} onChange={handleInputChange} />
      <button type="submit">Crear Evento</button>
    </form>
  );
};

export default EventForm;
