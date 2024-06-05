import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const ModalCitas = ({ show, onHide }) => {
    const [peticionesCita, setPeticionesCita] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (show) {
            fetch('/mostrarPeticiones')
                .then(response => response.json())
                .then(data => {
                    setPeticionesCita(data);
                    setLoading(false);
                })
                .catch(error => console.error('Error al obtener las citas:', error));
        }
    }, [show]);

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton className='modalHeader'>
                <Modal.Title>Mis peticiones de cita</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <div className="d-flex justify-content-center">
                        <Spinner animation="border" style={{ color: 'black' }} />
                    </div>
                ) : (
                    <div className="table-responsive">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Fecha y Hora</th>
                                    <th>Tatuaje</th>
                                    <th>Descripción</th>
                                    <th>Tatuador</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {peticionesCita.map((peticion) => (
                                    <tr key={peticion.id}>
                                        <td>{peticion.fecha}</td>
                                        <td>{peticion.nameTattoo}</td>
                                        <td>{peticion.description}</td>
                                        <td>{peticion.nameWorker}</td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', color: peticion.isAccepted ? 'green' : 'orange' }}>
                                                <span>{peticion.isAccepted ? 'Aceptada' : 'Pendiente'}</span>
                                                {peticion.isAccepted ? (
                                                    <IconButton style={{ color: 'green' }} disabled>
                                                        <DoneIcon />
                                                    </IconButton>
                                                ) : (
                                                    <IconButton style={{ color: 'orange' }} disabled>
                                                        <HelpOutlineIcon />
                                                    </IconButton>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalCitas;