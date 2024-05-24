import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';


const ListadoMerchandising = () => {

    const [merchandising, setMerchandising] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSizes, setSelectedSizes] = useState({});

    useEffect(() => {
        fetchMerchandising();
    }, []);

    //FUNCION PARA RECOGER TODOS LOS DATOS QUE NOS DA LA API_MERCHANDISING
    const fetchMerchandising = async () => {

        const response = await fetch('http://127.0.0.1:8000/api/merchandising');

        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }

        const data = await response.json();

        setMerchandising(data);
        setLoading(false);
    };

    //DEVOLVEMOS UN DIV MIENTRAS CARGA LA API
    if (loading) {
        return <div>Cargando...</div>;
    }

    //FUNCIÓN PARA PODER ENVIAR LOS DATOS AL BACKEND
    const handleAddToCart = async (merchanId) => {

        const size = selectedSizes[merchanId];

        const response = await fetch('http://127.0.0.1:8000/api/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                merchanId: merchanId,
                size: size,
                quantity: 1
            }),
        });

        if (!response.ok) {
            throw new Error('Error al añadir el producto al carrito');
        }

        alert('Producto añadido al carrito');
    }

    // ACTUALIZAMOS EL ESTADO CUANDO SE SELECCIONA UNA TALLA
    const handleSizeChange = (merchanId, size) => {
        setSelectedSizes(prevState => ({
            ...prevState,
            [merchanId]: size
        }));
    };


    return (
        <div className='container'>
            <h2 className='text-center my-4'>Listado de Merchandising</h2>
            <div className='row justify-content-center'>
                {merchandising.map(merchan => (
                    <div key={merchan.id} className={`col-lg-4 col-md-6 mb-4`}
                    >
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
                                    </Form.Group>
                                    <Button variant="secondary" className="mt-3" onClick={() => handleAddToCart(merchan.id)}>Añadir al carrito</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListadoMerchandising;