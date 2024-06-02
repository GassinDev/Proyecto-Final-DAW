import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


moment.locale('es');
const localizer = momentLocalizer(moment);

const CalendarioCitasCliente = ({ workerName }) => {
    const [citas, setCitas] = useState([]);

    const fetchCitas = async () => {
        const response = await fetch(`http://127.0.0.1:8000/mostrarCitasTrabajadores/${workerName}`);

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
                events={citas.map(cita => ({
                    start: new Date(cita.dateInicio),
                    end: new Date(cita.dateFin),
                    title: `Cita Ocupada`,
                }))}
            />
        </div>
    );
};

export default CalendarioCitasCliente;