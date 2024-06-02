import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import CalendarioCitasCliente from './CalendarioCitasCliente';
import '../styles/spinner.css';

const ListadoTatuajes = () => {
    const [tatuajes, setTatuajes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedWorker, setSelectedWorker] = useState('');
    const [workers, setWorkers] = useState([]);

    useEffect(() => {
        fetchTatuajes();
        fetchWorkers();
        const isAuthenticatedCookie = getCookie('authenticated');
        setAuthenticated(isAuthenticatedCookie === 'true');
    }, []);

    const getCookie = (name) => {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName.trim() === name) {
                return cookieValue;
            }
        }
        return '';
    };

    const fetchTatuajes = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/tatuajes');

        if (!response.ok) {
            throw new Error('Error al obtener los tatuajes');
        }

        const data = await response.json();
        setTatuajes(data);
        setLoading(false);
    };

    const fetchWorkers = async () => {
        const response = await fetch('http://127.0.0.1:8000/workers');

        if (!response.ok) {
            throw new Error('Error al obtener los trabajadores');
        }

        const data = await response.json();
        setWorkers(data);
    };

    if (loading) {
        return (
            <div className='spinner-container'>
                <Spinner animation="grow" className='spinner' />
            </div>
        );
    }

    const handleSelectWorker = () => {
        setShowModal(true);
    };

    return (
        <div className='container'>
            <h2 className='text-center my-4'>Listado de Tatuajes</h2>
            <div className='row justify-content-center'>
                {tatuajes.map(tatuaje => (
                    <div key={tatuaje.id} className='col-lg-4 col-md-6 mb-4'>
                        <div className='d-flex justify-content-center'>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={"uploads/images/tatuajes/" + tatuaje.image} alt={tatuaje.name} />
                                <Card.Body>
                                    <Card.Title>{tatuaje.name}</Card.Title>
                                    <Card.Text>Rango de precio: {tatuaje.price}€</Card.Text>
                                    {/* Mostrar el botón solo si el usuario está autenticado */}
                                    {authenticated ? (
                                        <Button variant="success" onClick={handleSelectWorker}>Pedir cita</Button>
                                    ) : (
                                        <Alert variant="warning">Por favor, inicia sesión para pedir tu cita.</Alert>
                                    )}
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                ))}
            </div>
            {/* Modal para seleccionar el trabajador y ver su calendario */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton style={{ backgroundColor: 'black' }}>
                    <Modal.Title>Seleccionar Trabajador</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="selectWorker">
                            <Form.Label>Seleccionar Trabajador</Form.Label>
                            <Form.Select onChange={(e) => setSelectedWorker(e.target.value)}>
                                <option value="">Seleccionar...</option>
                                {workers.map(worker => (
                                    <option key={worker.id} value={worker.username}>{worker.username}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                    {/* Mostrar el calendario del trabajador seleccionado */}
                    {selectedWorker && <CalendarioCitasCliente workerName={selectedWorker}/>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ListadoTatuajes;