import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';

moment.locale('es');
const localizer = momentLocalizer(moment);

const CalendarioCitasWorker = () => {
    const [citas, setCitas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ usernameCliente: '', description: '' });
    const [selectedSlot, setSelectedSlot] = useState(null);

    //PARA SELECCIONAR EL TRAMO HORARIO Y LUEGO MOSTRAR EL FORMULARIO
    const handleSelectSlot = ({ start, end }) => {
        setSelectedSlot({ start, end });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({ usernameCliente: '', description: '' });
    };

    //PARA GUARDAR LA CITA CGIENDO LOS VALORES Y ENVIANDOLOS AL SERVIDOR
    const handleSaveCita = () => {
        const { start, end } = selectedSlot;
        const { usernameCliente, description } = formData;
        fetch('/crearCita', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                start,
                end,
                usernameCliente,
                description,
            }),
        })
            .then(response => response.json())
            .then(response => {

                if (response.mensaje === "Cita creada con éxito") {
                    setShowModal(false);
                    Swal.fire({
                        icon: 'success',
                        title: 'Cita guardada con éxito',
                    });
                    fetchCitas();
                } else {
                    throw new Error('Ocurrió un error al guardar la cita.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Ocurrió un error al guardar la cita.');
            });
    };

    const handleSelectEvent = (event) => {
        const isConfirmed = window.confirm('¿Estás seguro de que quieres eliminar esta cita?');
        if (isConfirmed) {
            fetch(`/eliminarCita/${event.id}`, {
                method: 'DELETE',
            })
                .then(response => response.json())
                .then(response => {

                    if (response.mensaje === "Cita eliminada con éxito") {
                        Swal.fire({
                            icon: 'success',
                            title: 'Cita eliminada con éxito',
                        });
                        fetchCitas();
                    } else {
                        throw new Error('Ocurrió un error al eliminar la cita.');
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
                onSelectEvent={handleSelectEvent}
                events={citas.map(cita => ({
                    id: cita.id,
                    start: new Date(cita.dateInicio),
                    end: new Date(cita.dateFin),
                    title: `Cita con ${cita.clienteUsername}: ${cita.description}`,
                }))}
            />
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton style={{ backgroundColor: 'black'}}>
                    <Modal.Title>Crear nueva cita</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Nombre del Cliente</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese el nombre del cliente" value={formData.usernameCliente} onChange={(e) => setFormData({ ...formData, usernameCliente: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formBasicDescription">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Ingrese la descripción" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSaveCita}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CalendarioCitasWorker;