import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {

    const [authenticated, setAuthenticated] = useState(false);

    //PARA PEDIRLE AL BACKEND SI SE ENCUENTRA LOGEADO EL USUARIO
    const fetchAuthenticated = async () => {

        const response = await fetch('http://127.0.0.1:8000/comprobadorAutorizado');

        if (!response.ok) {
            throw new Error('Error al obtener la comprobación.');
        }

        const data = await response.text();

        setAuthenticated(data === 'true');
    };

    useEffect(() => {
        fetchAuthenticated();
    }, []);

    return (
        <Navbar expand="lg" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>GassInkTattoo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Inicio</Nav.Link>
                        <Nav.Link href="/productos">Productos</Nav.Link>
                        <Nav.Link href="/merchandising">Merchandising</Nav.Link>
                        {authenticated ? <Nav.Link href="/carrito">Carrito</Nav.Link> : null}
                        {authenticated ? null : <Nav.Link href="/register">Registro</Nav.Link>}
                        {authenticated ? null : <Nav.Link href="/login">Inicio de sesión</Nav.Link>}
                        {authenticated ? <Nav.Link href="/perfil">Perfil</Nav.Link> : null}
                        {authenticated ? <Nav.Link href="/logout">Cerrar sesión</Nav.Link> : null}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;