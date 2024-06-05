import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import FiltrosMerchandising from './FiltrosMerchandising';
import '../styles/spinner.css';
import Swal from 'sweetalert2';

const ListadoMerchandising = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [merchandising, setMerchandising] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSizes, setSelectedSizes] = useState({});
    const [quantities, setQuantities] = useState({});
    const [errors, setErrors] = useState({});
    const [filtros, setFiltros] = useState({ tipos: [], precio: '' });


    useEffect(() => {
        fetchMerchandising();
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

    const fetchMerchandising = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/merchandising');

        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }

        const data = await response.json();

        setMerchandising(data);
        setLoading(false);
    };

    if (loading) {
        return (
            <div className='spinner-container'>
                <Spinner animation="grow" className='spinner' />
            </div>
        );
    }

    const handleAddToCart = async (merchanId) => {
        const size = selectedSizes[merchanId];
        const quantity = quantities[merchanId] || 1;

        if (!authenticated) {
            setErrors(prevState => ({
                ...prevState,
                [merchanId]: 'Debe iniciar sesión para agregar al carrito'
            }));
            return;
        }

        if (!size) {
            setErrors(prevState => ({
                ...prevState,
                [merchanId]: 'No hay ninguna talla seleccionada'
            }));
            return;
        }

        const response = await fetch('http://127.0.0.1:8000/api/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                merchanId: merchanId,
                size: size,
                quantity: quantity
            }),
        });

        if (!response.ok) {
            throw new Error('Error al añadir el producto al carrito');
        }

        Swal.fire({
            icon: 'success',
            title: 'Producto añadido al carrito',
        });

        setErrors(prevState => ({
            ...prevState,
            [merchanId]: null
        }));
    };

    const handleSizeChange = (merchanId, size) => {
        setSelectedSizes(prevState => ({
            ...prevState,
            [merchanId]: size
        }));
        setErrors(prevState => ({
            ...prevState,
            [merchanId]: null
        }));
    };

    const handleQuantityChange = (merchanId, change) => {
        setQuantities(prevState => ({
            ...prevState,
            [merchanId]: Math.max(1, (prevState[merchanId] || 1) + change)
        }));
    };

    const handleFiltrosChange = (newFiltros) => {
        setFiltros(newFiltros);
    };

    const applyFilters = (merchandising) => {
        let filteredMerchandising = merchandising;

        if (filtros.tipos.length > 0) {
            filteredMerchandising = filteredMerchandising.filter(merchandising =>
                filtros.tipos.includes(merchandising.type)
            );
        }

        if (filtros.precio) {
            if (filtros.precio === 'asc') {
                filteredMerchandising = filteredMerchandising.sort((a, b) => a.price - b.price);
            } else if (filtros.precio === 'desc') {
                filteredMerchandising = filteredMerchandising.sort((a, b) => b.price - a.price);
            }
        }

        return filteredMerchandising;
    };

    const filteredMerchandising = applyFilters(merchandising);

    return (
        <div className='container'>
            {/* Alerta para usuarios no autenticados */}
            {!authenticated && <Alert variant="warning" className='alert'>Por favor, inicia sesión para agregar al carrito.</Alert>}
            <h2 className='text-center my-4'>Listado de Merchandising</h2>
            <div className='row justify-content-center'>
                <div className='col-lg-3'>
                    <FiltrosMerchandising onChange={handleFiltrosChange}/>
                </div>
                <div className='col-lg-9'>
                    <div className='row justify-content-center'>
                        {filteredMerchandising.map(merchan => (
                            <div key={merchan.id} className={`col-lg-4 col-md-6 mb-4`}>
                                <div className='d-flex justify-content-center'>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src={"uploads/images/merchandising/" + merchan.image} alt={merchan.name} />
                                        <Card.Body>
                                            <Card.Title>{merchan.name}</Card.Title>
                                            <Card.Text>Precio: {merchan.price}€</Card.Text>
                                            <Form.Group>
                                                <Form.Label>Selecciona la talla: </Form.Label>
                                                {merchan.size && merchan.size.map(s => (
                                                    <Form.Check
                                                        key={s}
                                                        type="checkbox"
                                                        id={s}
                                                        label={s}
                                                        checked={selectedSizes[merchan.id] === s}
                                                        onChange={() => handleSizeChange(merchan.id, s)}
                                                    />
                                                ))}
                                                {errors[merchan.id] && <Form.Text className="text-danger">{errors[merchan.id]}</Form.Text>}
                                            </Form.Group>
                                            <div className="d-flex align-items-center mt-3">
                                                <Button variant="outline-secondary" onClick={() => handleQuantityChange(merchan.id, -1)}>-</Button>
                                                <Form.Control
                                                    type="text"
                                                    value={quantities[merchan.id] || 1}
                                                    readOnly
                                                    className="mx-2 text-center"
                                                    style={{ width: '50px' }}
                                                />
                                                <Button variant="outline-secondary" onClick={() => handleQuantityChange(merchan.id, 1)}>+</Button>
                                            </div>
                                            {/* Mostrar botón de añadir al carrito según la autenticación del usuario */}
                                            {authenticated ? (
                                                <Button variant="success" className="mt-3" onClick={() => handleAddToCart(merchan.id)}>Añadir al carrito</Button>
                                            ) : (
                                                <Button disabled variant="success" className="mt-3">No puede pedir cita</Button>
                                            )}
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListadoMerchandising;