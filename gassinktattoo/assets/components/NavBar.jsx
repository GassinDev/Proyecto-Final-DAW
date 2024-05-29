import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../styles/navbar.css';
import '@fortawesome/fontawesome-free/css/all.css';

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
        <Navbar className='navbar-custom' expand="lg" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand className='brand-custom'>GASSINKTATTOO</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto nav-custom">
                        <a href="/home">Inicio</a>
                        <a href="/productos">Productos</a>
                        <a href="/merchandising">Merchandising</a>
                        {authenticated ? <a href="/carrito">Carrito</a> : null}
                        {authenticated ? null : <a href="/register">Registro</a>}
                        {authenticated ? null : <a href="/login">Inicio de sesión</a>}
                        {authenticated ? <a href="/perfil">Perfil</a> : null}
                        {authenticated ? <a href="/logout">Cerrar sesión</a> : null}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;