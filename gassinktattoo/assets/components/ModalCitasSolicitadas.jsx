import React, { useEffect, useState } from 'react';
import { Modal, Spinner, Button, Card, Row, Col, Accordion, Table } from 'react-bootstrap';

const ModalCitasSolicitadas = ({ show, onHide }) => {

    const [solicitadasCita, setSolicitadasCita] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (show) {
            setLoading(true);
            fetchSolicitudesCitas();
        }
    }, [show]);

    const fetchSolicitudesCitas = async () => {

        const response = await fetch('/mostrarPeticiones/trabajador');
        if (!response.ok) {
            throw new Error('Error al obtener las peticiones citas');
        }
        const data = await response.json();
        setLoading(false);
        setSolicitadasCita(data);
    };

    const handleAcceptRequest = (idPeticionCita) => {

        fetch(`/aceptarSolicitudCita/${idPeticionCita}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: idPeticionCita }),
        })
            .then(response => {
                if (response.ok) {
                    fetchSolicitudesCitas();
                } else {
                    throw new Error('Error al aceptar la solicitud de cita');
                }
            })
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton className='modalHeader'>
                <Modal.Title>Citas</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <div className="d-flex justify-content-center">
                        <Spinner animation="border" style={{ color: 'black' }} />
                    </div>
                ) : (<Row className="justify-content-center">
                    <Col xs={12}>
                        <Card>
                            <Card.Body>
                                <Accordion>
                                    <Accordion.Item key='1' eventKey='1' >
                                        <Accordion.Header onClick={() => fetchSolicitudesCitas()}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    Solicitudes de citas
                                                </div>
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th>Fecha y Hora</th>
                                                        <th>Tatuaje</th>
                                                        <th>Descripción</th>
                                                        <th>Cliente</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {solicitadasCita.filter(peticion => !peticion.isAccepted).map(peticion => (
                                                        <tr key={peticion.id}>
                                                            <td>{peticion.fecha}</td>
                                                            <td>{peticion.nameTattoo}</td>
                                                            <td>{peticion.description}</td>
                                                            <td>{peticion.usernameCliente}</td>
                                                            <td>
                                                                <Button onClick={() => handleAcceptRequest(peticion.id)}>Aceptar</Button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                    }
                                                </tbody>
                                            </Table>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item key='2' eventKey='2' >
                                        <Accordion.Header onClick={() => fetchSolicitudesCitas()}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    Citas aceptadas
                                                </div>
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th>Fecha y Hora</th>
                                                        <th>Tatuaje</th>
                                                        <th>Descripción</th>
                                                        <th>Cliente</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {solicitadasCita.filter(peticion => peticion.isAccepted).map(peticion => (
                                                        <tr key={peticion.id}>
                                                            <td>{peticion.fecha}</td>
                                                            <td>{peticion.nameTattoo}</td>
                                                            <td>{peticion.description}</td>
                                                            <td>{peticion.usernameCliente}</td>
                                                        </tr>
                                                    ))
                                                    }
                                                </tbody>
                                            </Table>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalCitasSolicitadas;

