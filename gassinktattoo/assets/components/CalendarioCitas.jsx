import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('es');
const localizer = momentLocalizer(moment);

const CalendarioCitas = () => {

    const [citas, setCitas] = useState([]);
    
    const handleSelectSlot = ({ start, end }) => {

        const isConfirmed = window.confirm('¿Estás seguro de que quieres crear una cita en esta fecha y hora?');

        if (isConfirmed) {
            fetch('/crearCita', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    start,
                    end,
                }),
            })
                .then(response => response.json())
                .then(response => {
                    console.log('Respuesta del servidor:', response); // Agregado para depuración
                    if (response.mensaje === "Cita creada con éxito") {
                        alert('Cita guardada con éxito.');
                        fetchCitas();
                    } else {
                        throw new Error('Ocurrió un error al guardar la cita.');
                    }
                })
        }

    };

    const fetchCitas = async () => {
        const response = await fetch('http://127.0.0.1:8000/mostrarCitas');

        if (!response.ok) {
            throw new Error('Error al obtener las citas');
        }

        const data = await response.json();

        setCitas(data);
    };

    useEffect(() => {
        fetchCitas();
    }, []);

    return (
        <div style={{ height: '70vh' }}>
            <Calendar
                localizer={localizer}
                defaultView="month"
                startAccessor="start"
                endAccessor="end"
                selectable={true}
                onSelectSlot={handleSelectSlot}
                events={citas.map(cita => ({
                    // Ajusta los campos de fecha y hora según tu estructura de datos
                    start: new Date(cita.dateInicio),
                    end: new Date(cita.dateFin),
                    title: 'Cita Disponible',
                }))}
            />
        </div>
    );
};

export default CalendarioCitas;