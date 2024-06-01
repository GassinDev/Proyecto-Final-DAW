import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Spinner } from 'react-bootstrap';
import '../styles/spinner.css';

const Carrito = () => {
    const [productos, setProductos] = useState([]);
    const [merchandising, setMerchandising] = useState([]);
    const [verificado, setVerificado] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchArticulos();
        fetchVerificadoCookie();
    }, []);

    const fetchArticulos = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/cart/show');
            if (!response.ok) {
                throw new Error('Error al obtener los productos');
            }
            const data = await response.json();
            setProductos(data.productos);
            setMerchandising(data.merchandising);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    const fetchVerificado = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/comprobarVerificado');
            if (!response.ok) {
                throw new Error('Error al obtener el resultado');
            }
            const data = await response.text();
            const isVerified = data === 'true';
            console.log('Fetched verification status:', isVerified);
            setVerificado(isVerified);
            document.cookie = `verificado=${isVerified}; path=/`;
        } catch (error) {
            console.error('Error fetching verification status:', error);
        }
    };

    const fetchVerificadoCookie = () => {
        const isVerificadoCookie = getCookie('verificado');
        console.log('Cookie value:', isVerificadoCookie);
        if (isVerificadoCookie !== 'true') {
            fetchVerificado();
        } else {
            setVerificado(true);
        }
    };

    const getCookie = (name) => {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName.trim() === name) {
                return cookieValue.trim();
            }
        }
        return '';
    };

    if (loading) {
        return (
            <div className='spinner-container'>
                <Spinner animation="grow" className='spinner' />
            </div>
        );
    }

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

    const handlePedido = () => {
        window.location.href = '/pedido/realizar';
    };

    return (
        <Container>
            <h2>Carrito</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Precio total artículos</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(producto => (
                        <tr key={producto.id}>
                            <td>
                                <img src={`uploads/images/productos/${producto.image}`} alt={producto.name} style={{ width: '100px' }} />
                            </td>
                            <td>{producto.name}</td>
                            <td>{producto.price}€</td>
                            <td>{producto.quantity}</td>
                            <td>{producto.price * producto.quantity}€</td>
                        </tr>
                    ))}
                    {merchandising.map(merchan => (
                        <tr key={merchan.id}>
                            <td>
                                <img src={`uploads/images/merchandising/${merchan.image}`} alt={merchan.name} style={{ width: '100px' }} />
                            </td>
                            <td>{merchan.name} - Talla: {merchan.size}</td>
                            <td>{merchan.price}€</td>
                            <td>{merchan.quantity}</td>
                            <td>{merchan.price * merchan.quantity}€</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="4" className="text-right"><strong>Subtotal</strong></td>
                        <td><strong>{calcularTotal()}€</strong></td>
                    </tr>
                </tbody>
            </Table>
            {verificado ? (
                <Button variant="primary" onClick={handlePedido}>Realizar Pedido</Button>
            ) : (
                <Button variant="primary" disabled>No verificado - No puede realizar el pedido</Button>
            )}
        </Container>
    );
};

export default Carrito;