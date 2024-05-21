import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

const ListadoMerchandising = () => {
    const [merchandising, setMerchandising] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMerchandising();
    }, []);

    const fetchMerchandising = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/merchandising');
            if (!response.ok) {
                throw new Error('Error al obtener los productos');
            }
            const data = await response.json();
            setMerchandising(data);
            setLoading(false);
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className='container'>
            <h2 className='text-center my-4'>Listado de Merchandising</h2>
            <div className='row justify-content-center'>
                {merchandising.map(merchan => (
                    <div key={merchan.id} className='col-lg-4 col-md-6 mb-4'>
                        <div className='d-flex justify-content-center'>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={"uploads/images/merchandising/" + merchan.image} alt={merchan.name} />
                                <Card.Body>
                                    <Card.Title>{merchan.name}</Card.Title>
                                    <Card.Text>{merchan.description}</Card.Text>
                                    <Card.Text>Precio: {merchan.price}€</Card.Text>
                                    {/* Renderizar los checkboxes de tamaños disponibles */}
                                    <Form>
                                        {merchan.size && merchan.size.map(s => (
                                            <Form.Check 
                                                key={s}
                                                type="checkbox"
                                                label={s}
                                                id={`size-${merchan.id}-${s}`}
                                            />
                                        ))}
                                    </Form>
                                    <Button variant="secondary" className="mt-3">Añadir al carrito</Button>
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