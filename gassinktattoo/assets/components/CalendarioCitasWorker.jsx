import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'moment-timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const localizer = momentLocalizer(moment);

const CalendarioCitasWorker = () => {
    const [citas, setCitas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ usernameCliente: '', nameTatuaje: '', description: '' });
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [clientesOptions, setClientesOptions] = useState([]);
    const [tatuajesOptions, setTatuajeOptions] = useState([]);

    useEffect(() => {
        fetchCitas();
        fetchClientesUsernames();
        fetchtTatuajesNames();
    }, []);

    const fetchCitas = async () => {
        const response = await fetch('http://127.0.0.1:8000/mostrarCitas');

        if (!response.ok) {
            throw new Error('Error al obtener las citas');
        }

        const data = await response.json();

        setCitas(data);
    };

    const fetchClientesUsernames = async () => {
        const response = await fetch('http://127.0.0.1:8000/workers/clienteUsernames');

        if (!response.ok) {
            throw new Error('Error al obtener los nombres de usuario de los clientes');
        }

        const data = await response.json();

        setClientesOptions(data.usernames);
    };

    const fetchtTatuajesNames = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/tatuajesName');

        if (!response.ok) {
            throw new Error('Error al obtener los nombres de los tatuajes.');
        }

        const data = await response.json();

        setTatuajeOptions(data.namesTatuajes);
    };

    //PARA GUARDAR LA CITA CGIENDO LOS VALORES Y ENVIANDOLOS AL SERVIDOR
    const handleSaveCita = () => {
        const { start, end } = selectedSlot;
        const { usernameCliente, nameTatuaje, description } = formData;

        fetch('http://127.0.0.1:8000/crearCita', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                start,
                end,
                usernameCliente,
                nameTatuaje,
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

    const handleSelectEvent = async (event) => {

        const result = await Swal.fire({
            title: "¿ Quieres elimar esta cita ?",
            showDenyButton: true,
            confirmButtonText: "Si",
            denyButtonText: `No`
        });

        if (result.isConfirmed) {
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

    const handleSelectSlot = ({ start, end }) => {
        setSelectedSlot({ start, end });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({ usernameCliente: '', nameTatuaje: '', description: '' });
    };



    return (
        <div style={{ height: '80vh' }}>
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
                    title: `Cita con ${cita.clienteUsername} - ${cita.nameTatuaje} - ${cita.description}`,
                }))}
            />
            <Modal show={showModal} onHide={handleCloseModal} style={{ color: 'black' }}>
                <Modal.Header closeButton style={{ backgroundColor: 'black', color: 'white' }} >
                    <Modal.Title>Crear nueva cita</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicUsername" className='mb-1'>
                            <Form.Label>Nombre del Cliente</Form.Label>
                            <AsyncTypeahead
                                id="usernameCliente"
                                labelKey="username"
                                options={clientesOptions}
                                onSearch={fetchClientesUsernames}
                                onChange={(selected) => setFormData({ ...formData, usernameCliente: selected[0] })}
                                placeholder="Ingrese el nombre del cliente"
                                minLength={1}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicNameTatuaje" className='mb-1'>
                            <Form.Label>Nombre del tatuaje</Form.Label>
                            <AsyncTypeahead
                                id="nameTatuaje"
                                labelKey="name"
                                options={tatuajesOptions}
                                onSearch={fetchtTatuajesNames}
                                onChange={(selected) => setFormData({ ...formData, nameTatuaje: selected[0] })}
                                placeholder="Ingrese el nombre del tatuaje"
                                minLength={1}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicDescription" className='mt-1'>
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