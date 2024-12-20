import React from 'react';
import { useSelector } from 'react-redux';

const EventList = () => {
  const { events, loading } = useSelector((state) => state.events);

  if (loading) return <p>Cargando eventos...</p>;

  return (
    <ul>
      {events.map((event) => (
        <li key={event._id}>
          <h3>{event.titulo}</h3>
          <p>{event.descripcion}</p>
          <p>{event.fecha}</p>
        </li>
      ))}
    </ul>
  );
};

export default EventList;
