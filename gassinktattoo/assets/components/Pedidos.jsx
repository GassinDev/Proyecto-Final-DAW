import React, { useEffect, useState } from 'react';
import { Modal, Spinner, Button, Card, Row, Col } from 'react-bootstrap';
import '../styles/pedidosModal.css';

const Pedidos = ({ show, onHide }) => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPedidos();
        fetchVerificado
    }, []);

    const fetchPedidos = async () => {

        const response = await fetch('http://127.0.0.1:8000/pedido/show');

        if (!response.ok) {
            throw new Error('Error al obtener los pedidos');
        }

        const data = await response.json();
        setPedidos(data);
        setLoading(false);
    };

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton className='modalHeader'>
                <Modal.Title>Pedidos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <div className='spinner-container'>
                        <Spinner animation="grow" className='spinner' />
                    </div>
                ) : (
                    <Row className="justify-content-center">
                        <Col xs={12}>
                            <Card>
                                <Card.Body>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Fecha</th>
                                                <th>Estado</th>
                                                <th>Precio</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pedidos.map(pedido => (
                                                <tr>
                                                    <td>{pedido.orderDate}</td>
                                                    <td>{pedido.status}</td>
                                                    <td>{pedido.price}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Pedidos;