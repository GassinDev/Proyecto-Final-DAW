import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Swal from 'sweetalert2';
import '../styles/spinner.css';

const ListadoProductos = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        fetchProductos();
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

    const fetchProductos = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/productos');

        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }

        const data = await response.json();
        setProductos(data);
        setLoading(false);
    };

    if (loading) {
        return (
            <div className='spinner-container'>
                <Spinner animation="grow" className='spinner'/>
            </div>
        );
    }

    // Función para manejar el evento de agregar al carrito
    const handleAddToCart = async (productoId) => {
        // Verifica si el usuario está autenticado
        if (!authenticated) {
            alert('Por favor, inicia sesión para agregar al carrito');
            return;
        }

        const response = await fetch('http://127.0.0.1:8000/api/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productoId: productoId,
                quantity: 1
            }),
        });

        if (!response.ok) {
            throw new Error('Error al añadir el producto al carrito');
        }

        Swal.fire({
            icon: 'success',
            title: 'Producto añadido al carrito',
        });
    }

    return (
        <div className='container'>
            <h2 className='text-center my-4'>Listado de Productos</h2>
            <div className='row justify-content-center'>
                {productos.map(producto => (
                    <div key={producto.id} className='col-lg-4 col-md-6 mb-4'>
                        <div className='d-flex justify-content-center'>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={"uploads/images/productos/" + producto.image} alt={producto.name} />
                                <Card.Body>
                                    <Card.Title>{producto.name}</Card.Title>
                                    <Card.Text>Precio: {producto.price}€</Card.Text>
                                    {/* Mostrar el botón solo si el usuario está autenticado */}
                                    {authenticated ? (
                                        <Button variant="success" onClick={() => handleAddToCart(producto.id)}>Añadir al carrito</Button>
                                    ) : (
                                        <Alert variant="warning">Por favor, inicia sesión para agregar al carrito</Alert>
                                    )}
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListadoProductos;