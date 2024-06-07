import React, { useEffect, useState } from 'react';
import { Button, Card, Spinner, Alert, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import '../styles/spinner.css';
import '../styles/modalInfo.css';
import '../styles/letras.css';

const ListadoProductos = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedNameProducto, setSelectedNameProducto] = useState('');
    const [selectedDescriptionProducto, setSelectedDescriptionProducto] = useState('');

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
                <Spinner animation="grow" className='spinner' />
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

    const handleImageClick = (image, name, description) => {
        setSelectedImage(image);
        setSelectedNameProducto(name);
        setSelectedDescriptionProducto(description);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className='container'>
            {/* Alerta para usuarios no autenticados */}
            {!authenticated && <Alert variant="warning" className='alert'>Por favor, inicia sesión para agregar al carrito.</Alert>}
            <h2 className='text-center my-4 titulo'>Productos</h2>
            <div className='row justify-content-center'>
                {productos.map(producto => (
                    <div key={producto.id} className='col-lg-4 col-md-6 mb-4'>
                        <div className='d-flex justify-content-center'>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img
                                    variant="top"
                                    src={"uploads/images/productos/" + producto.image}
                                    alt={producto.name}
                                    onClick={
                                        () => handleImageClick("uploads/images/productos/" + producto.image, producto.name, producto.description)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <Card.Body>
                                    <Card.Title>{producto.name}</Card.Title>
                                    <Card.Text>Precio: {producto.price}€</Card.Text>
                                    {/* Mostrar el botón solo si el usuario está autenticado */}
                                    {authenticated ? (
                                        <Button variant="success" onClick={() => handleAddToCart(producto.id)}>Añadir al carrito</Button>
                                    ) : (
                                        <Button disabled variant="success" className="mt-3">Añadir al carrito</Button>
                                    )}
                                </Card.Body>
                            </Card>

                        </div>
                    </div>
                ))}
            </div>

            <Modal
                show={showModal}
                onHide={handleCloseModal}
                centered
                dialogClassName="custom-modal"
            >
                <Modal.Header className='custom-header'>
                    <Modal.Title>{selectedNameProducto}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="custom-modal-body">
                    <div className="row">
                        <div className="col-md-6">
                            <img src={selectedImage} alt="Producto" className="img-fluid" />
                        </div>
                        <div className="col-md-6">
                            <div dangerouslySetInnerHTML={{ __html: selectedDescriptionProducto }} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ListadoProductos;