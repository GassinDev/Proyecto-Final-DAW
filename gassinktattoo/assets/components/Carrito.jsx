import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';

const Carrito = () => {

    const [productos, setProductos] = useState([]);
    const [merchandising, setMerchandising] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMerchandising();
    }, []);

    //FUNCION PARA RECOGER TODOS LOS DATOS QUE NOS DA LA API_MERCHANDISING
    const fetchMerchandising = async () => {

        const response = await fetch('http://127.0.0.1:8000/api/cart/show');

        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }

        const data = await response.json();

        setProductos(data.productos);
        setMerchandising(data.merchandising);
        setLoading(false);
    };



    //DEVOLVEMOS UN DIV MIENTRAS CARGA LA API
    if (loading) {
        return <div>Cargando...</div>;
    }

    const calculateTotal = () => {
        const productTotal = productos.reduce((sum, producto) => sum + producto.price * producto.quantity, 0);
        const merchanTotal = merchandising.reduce((sum, merchan) => sum + merchan.price * merchan.quantity, 0);
        return productTotal + merchanTotal;
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
                        <th>Talla</th>
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
                            <td>N/A</td>
                        </tr>
                    ))}
                    {merchandising.map(merchan => (
                        <tr key={merchan.id}>
                            <td>
                                <img src={`uploads/images/merchandising/${merchan.image}`} alt={merchan.name} style={{ width: '100px' }} />
                            </td>
                            <td>{merchan.name}</td>
                            <td>{merchan.price}€</td>
                            <td>{merchan.quantity}</td>
                            <td>{merchan.size}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="4" className="text-right"><strong>Total</strong></td>
                        <td><strong>{calculateTotal()}€</strong></td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
};

export default Carrito;