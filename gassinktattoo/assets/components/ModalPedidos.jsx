import React, { useEffect, useState } from 'react';
import { Modal, Spinner, Button, Card, Row, Col, Accordion, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faTruck, faBox } from '@fortawesome/free-solid-svg-icons';
import '../styles/pedidosModal.css';

const ModalPedidos = ({ show, onHide }) => {
    const [pedidos, setPedidos] = useState([]);
    const [articulosPedido, setArticulosPedido] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalReady, setIsModalReady] = useState(false);

    useEffect(() => {
        if (show) {
            setIsModalReady(false);
            fetchPedidos();
        }
    }, [show]);

    const fetchPedidos = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:8000/pedido/show');
            if (!response.ok) {
                throw new Error('Error al obtener los pedidos');
            }
            const data = await response.json();
            setPedidos(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            //GRACIAS A ESTE ESTADO CONTROLAMOS QUE APAREZCA EL MODAL UNA VEZ ESTE CARGADO EL CONTENIDO Y EVITAR FALLO DE DIMENSIONES
            setIsModalReady(true);
        }
    };

    const fetchArticulosPedido = async (idPedido) => {

        const response = await fetch(`http://127.0.0.1:8000/pedido/show/${idPedido}`);
        if (!response.ok) {
            throw new Error('Error al obtener los artículos del pedido');
        }
        const data = await response.json();
        setArticulosPedido(data);
    };

    return (
        <Modal show={show && isModalReady} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className='modalHeader'>
                <Modal.Title>Pedidos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <div className="d-flex justify-content-center">
                        <Spinner animation="border" style={{ color: 'black' }} />
                    </div>
                ) : (
                    <Row className="justify-content-center">
                        <Col xs={12}>
                            <Card>
                                <Card.Body>
                                    {pedidos.length === 0 ? (
                                        <div className="no-pedidos">
                                            <p>No hay pedidos realizados.</p>
                                        </div>
                                    ) : (
                                        <Accordion>
                                            {pedidos.map((pedido) => (
                                                <Accordion.Item key={pedido.id} eventKey={pedido.id} >
                                                    <Accordion.Header onClick={() => fetchArticulosPedido(pedido.id)}>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <strong>Fecha:</strong> {pedido.orderDate} - <strong>Precio:</strong> {pedido.price}€ - <strong>Estado:</strong> {pedido.status}

                                                                {pedido.status === 'Pendiente' && (
                                                                    <strong className="text-warning m-1">
                                                                        <FontAwesomeIcon icon={faExclamationCircle} />
                                                                    </strong>
                                                                )}
                                                                {pedido.status === 'En reparto' && (
                                                                    <strong className="text-info m-1">
                                                                        <FontAwesomeIcon icon={faTruck} />
                                                                    </strong>
                                                                )}
                                                                {pedido.status === 'Enviado' && (
                                                                    <strong className="text-success m-1">
                                                                        <FontAwesomeIcon icon={faBox} />
                                                                    </strong>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <Table striped bordered hover responsive>
                                                            <thead>
                                                                <tr>
                                                                    <th>Articulo</th>
                                                                    <th>Cantidad</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {articulosPedido.map((articulo) => (
                                                                    <tr key={articulo.id}>
                                                                        <td>{articulo.productName || articulo.merchandisingName}-{articulo.size}</td>
                                                                        <td>{articulo.quantity}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </Table>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            ))}
                                        </Accordion>
                                    )}
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

export default ModalPedidos;