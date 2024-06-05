import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Table } from 'react-bootstrap';
import PagoPedidoModal from './PagoPedidoModal';
import Spinner from 'react-bootstrap/Spinner';
import Swal from 'sweetalert2';
import '../styles/spinner.css';

const RealizarPedido = () => {

    //PARA LOS PRODUCTOS DEL PEDIDO, ADEMAS DE OTRAS UTILIDADES
    const [productos, setProductos] = useState([]);
    const [merchandising, setMerchandising] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [paymentAccepted, setPaymentAccepted] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);


    //PARA ALMACENAR LOS DATOS Y LUEGO MOSTRAR QUE ESTÁ VERIFICADO
    const [datosPedido, setDatosPedido] = useState({
        nombre: '',
        telefono: '',
        calle: '',
        ciudad: '',
        provincia: '',
        cp: '',
        pais: '',
        numero: '',
        precio: precioFinal,
        metodoPago: 'tarjetaCredito',
        numeroTarjeta: '',
        fechaExpiracion: '',
        cvv: '',
        correo: '',
        contraseña: '',
    });

    useEffect(() => {
        fetchArticulos();
    }, []);

    //PARA CONSEGUIR LOS ARTICULOS QUE IRAN EN EL PEDIDO
    const fetchArticulos = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/cart/show');
        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }
        const data = await response.json();
        setProductos(data.productos);
        setMerchandising(data.merchandising);
        setLoading(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatosPedido({ ...datosPedido, [name]: value });
    };

    const calcularTotal = () => {
        let total = 0;
        for (const producto of productos) {
            total += producto.price * producto.quantity;
        }
        for (const merchan of merchandising) {
            total += merchan.price * merchan.quantity;
        }
        return total;
    };

    //VARIABLE PARA USARLA EN EL JSON QUE SE ENVIARÁ AL BACKEND
    let precioFinal = calcularTotal() * 1.21;
    datosPedido.precio = precioFinal;

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        setShowModal(false);
        setPaymentAccepted(true);
    };

    if (loading) {
        return <div className='spinner-container'>
            <Spinner animation="grow" className='spinner' />
        </div>
    }


    //FUNCIÓN PARA ENVIAR LOS DATOS DEL PEDIDO AL BACKEND
    const handlePedidoSubmit = async () => {
        const camposRequeridos = ['nombre', 'telefono', 'calle', 'ciudad', 'provincia', 'cp', 'pais'];
        const camposVacios = camposRequeridos.filter(campo => !datosPedido[campo]);

        const result = await Swal.fire({
            title: "¿ Quieres realizar el pedido ?",
            imageUrl: "https://media2.giphy.com/media/LmsH9leFrFp3vT4f8F/200.webp?cid=790b7611tkxx2tg7s9xwikz60xn8xyw6jag2la21y84l460q&ep=v1_gifs_search&rid=200.webp&ct=g",
            imageWidth: 400,
            imageHeight: 300,
            imageAlt: "Custom image",
            showDenyButton: true,
            confirmButtonText: "Si",
            denyButtonText: `No`
        });

        if (camposVacios.length > 0) {
            setError('Por favor, complete todos los campos requeridos.');
            return;
        }

        if (result.isConfirmed) {
            fetch('http://127.0.0.1:8000/pedido/guardar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosPedido),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al enviar el pedido');
                    }
                    return response.json();
                })
                .then(() => {
                    setError(null);
                    Swal.fire({
                        title: "Pedido realizado",
                        text: "¡Tu pedido ha sido realizado correctamente!",
                        icon: "success",
                        confirmButtonText: "OK"
                    }).then(() => {
                        // Redirigir al usuario al perfil después de cerrar la alerta
                        Swal.fire("Pedido realizado", "", "success");
                        window.location.href = '/perfil';
                    });
                })
        } else {

        }


    };

    return (
        <Container className="py-4">
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
            <h2 className="text-center mb-4">Realizar Pedido</h2>
            <Form>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formNombre">
                            <Form.Label>Nombre completo *</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese su nombre" name="nombre" value={datosPedido.nombre} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formTelefono">
                            <Form.Label>Teléfono *</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese su teléfono" name="telefono" value={datosPedido.telefono} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formNumero">
                            <Form.Label>Número *</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese el número" name="numero" value={datosPedido.numero} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formCalle" className="mb-3">
                            <Form.Label>Calle *</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese la calle" name="calle" value={datosPedido.calle} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formCP">
                            <Form.Label>Código Postal *</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese el código postal" name="cp" value={datosPedido.cp} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formCiudad" className="mb-3">
                            <Form.Label>Ciudad *</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese la ciudad" name="ciudad" value={datosPedido.ciudad} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formProvincia">
                            <Form.Label>Provincia *</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese la provincia" name="provincia" value={datosPedido.provincia} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formPais">
                            <Form.Label>País *</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese el país" name="pais" value={datosPedido.pais} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                {!paymentAccepted && (
                    <Button variant="primary" onClick={() => setShowModal(true)} className="mx-auto d-block">
                        Ingresar Datos de Pago
                    </Button>
                )}
                <PagoPedidoModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    datosPedido={datosPedido}
                    handleChange={handleChange}
                    handlePaymentSubmit={handlePaymentSubmit}
                />
                {paymentAccepted && (
                    <div className="alert alert-success mt-3">
                        El pago ha sido aceptado. Puedes realizar el pedido.
                    </div>
                )}
                {paymentAccepted && (
                    <Button variant="success" onClick={handlePedidoSubmit} className="mx-auto d-block">
                        Realizar pedido
                    </Button>
                )}
            </Form>
            <h3 className="mt-4">Resumen del pedido</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Precio total artículos</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(producto => (
                        <tr key={producto.id}>
                            <td>{producto.name}</td>
                            <td>{producto.price}€</td>
                            <td>{producto.quantity}</td>
                            <td>{producto.price * producto.quantity}€</td>
                        </tr>
                    ))}
                    {merchandising.map(merchan => (
                        <tr key={merchan.id}>
                            <td>{merchan.name} - Talla: {merchan.size}</td>
                            <td>{merchan.price}€</td>
                            <td>{merchan.quantity}</td>
                            <td>{merchan.price * merchan.quantity}€</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="3" className="text-right"><strong>Subtotal</strong></td>
                        <td><strong>{calcularTotal()}€</strong></td>
                    </tr>
                    <tr>
                        <td colSpan="3" className="text-right"><strong>Total con IVA</strong></td>
                        <td><strong>{precioFinal}€</strong></td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
};

export default RealizarPedido;