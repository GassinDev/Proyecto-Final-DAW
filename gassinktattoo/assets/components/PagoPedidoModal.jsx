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
                        <Form.Label style={{ color: 'black' }}>Método de Pago</Form.Label>
                        <Form.Control as="select" name="metodoPago" value={datosPedido.metodoPago} onChange={handleChange}>
                            <option value="tarjetaCredito">Tarjeta de Crédito</option>
                            <option value="paypal">PayPal</option>
                        </Form.Control>
                    </Form.Group>
                    {datosPedido.metodoPago === 'tarjetaCredito' && (
                        <div>
                            <Form.Group controlId="formNumeroTarjeta">
                                <Form.Label style={{ color: 'black' }}>Número de Tarjeta</Form.Label>
                                <Form.Control type="text" placeholder="XXXX-XXXX-XXXX-XXXX" name="numeroTarjeta" required/>
                            </Form.Group>
                            <Form.Group controlId="formFechaExpiracion">
                                <Form.Label style={{ color: 'black' }}>Fecha de Expiración</Form.Label>
                                <Form.Control type="text" placeholder="MM/AA" name="fechaExpiracion" required/>
                            </Form.Group>
                            <Form.Group controlId="formCVV">
                                <Form.Label style={{ color: 'black' }}>CVV</Form.Label>
                                <Form.Control type="text" placeholder="CVV" name="cvv" required/>
                            </Form.Group>
                        </div>
                    )}
                    {datosPedido.metodoPago === 'paypal' && (
                        <div>
                            <Form.Group controlId="formCorreo">
                                <Form.Label style={{ color: 'black' }}>Correo</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese su correo" name="correo" required/>
                            </Form.Group>
                            <Form.Group controlId="formContraseña">
                                <Form.Label style={{ color: 'black' }}>Contraseña</Form.Label>
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