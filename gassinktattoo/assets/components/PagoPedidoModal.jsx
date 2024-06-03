import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const PagoPedidoModal = ({ showModal, setShowModal, datosPedido, handleChange, handlePaymentSubmit }) => {

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton style={{ backgroundColor: 'black' }}>
                <Modal.Title>Datos de Pago</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handlePaymentSubmit}>
                    <Form.Group controlId="formMetodoPago">
                        <Form.Label>Método de Pago</Form.Label>
                        <Form.Control as="select" name="metodoPago" value={datosPedido.metodoPago} onChange={handleChange}>
                            <option value="tarjetaCredito">Tarjeta de Crédito</option>
                            <option value="paypal">PayPal</option>
                        </Form.Control>
                    </Form.Group>
                    {datosPedido.metodoPago === 'tarjetaCredito' && (
                        <div>
                            <Form.Group controlId="formNumeroTarjeta">
                                <Form.Label>Número de Tarjeta</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el número de tarjeta" name="numeroTarjeta" required/>
                            </Form.Group>
                            <Form.Group controlId="formFechaExpiracion">
                                <Form.Label>Fecha de Expiración</Form.Label>
                                <Form.Control type="text" placeholder="MM/AA" name="fechaExpiracion" required/>
                            </Form.Group>
                            <Form.Group controlId="formCVV">
                                <Form.Label>CVV</Form.Label>
                                <Form.Control type="text" placeholder="CVV" name="cvv" required/>
                            </Form.Group>
                        </div>
                    )}
                    {datosPedido.metodoPago === 'paypal' && (
                        <div>
                            <Form.Group controlId="formCorreo">
                                <Form.Label>Correo</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese su correo" name="correo" required/>
                            </Form.Group>
                            <Form.Group controlId="formContraseña">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese su contraseña" name="contraseña" required/>
                            </Form.Group>
                        </div>
                    )}
                    <Button variant="success" type="submit" className="mt-3">
                        Guardar Datos de Pago
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default PagoPedidoModal;