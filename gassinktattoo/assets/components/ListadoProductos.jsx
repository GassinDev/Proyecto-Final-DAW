import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import '../styles/spinner.css';

const ListadoProductos = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProductos();
    }, []);

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
        return <div className='spinner-container'>
        <Spinner animation="grow" className='spinner'/>
    </div>
    }

    //FUNCIÓN PARA PODER ENVIAR LOS DATOS AL BACKEND
    const handleAddToCart = async (productoId) => {

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

        alert('Producto añadido al carrito');

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
                                    {/* <Card.Text>{producto.description}</Card.Text> */}
                                    <Card.Text>Precio: {producto.price}€</Card.Text>
                                    <Button variant="secondary" onClick={() => handleAddToCart(producto.id)}>Añadir al carrito</Button>
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