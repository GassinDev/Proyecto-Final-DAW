import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';

const Carrito = () => {

    const [productos, setProductos] = useState([]);
    const [merchandising, setMerchandising] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchArticulos();
    }, []);

    //FUNCION PARA RECOGER TODOS LOS DATOS QUE NOS DA LA API_MERCHANDISING
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



    //DEVOLVEMOS UN DIV MIENTRAS CARGA LA API
    if (loading) {
        return <div>Cargando...</div>;
    }

    //FUNCIÓN PARA CALCULO TOTAL
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

    //FUNCIÓN PARA MANDARNOS A LA RUTA DE REALIZAR PEDIDO
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
                        <td colSpan="4" className="text-right"><strong>Total</strong></td>
                        <td><strong>{calcularTotal()}€</strong></td>
                    </tr>
                </tbody>
            </Table>
            <Button variant="primary" onClick={handlePedido}>Realizar Pedido</Button>
        </Container>
    );
};

export default Carrito;