import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../styles/navbar.css';
import '@fortawesome/fontawesome-free/css/all.css';

const NavBar = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [isWorker, setIsWorker] = useState(false);

    useEffect(() => {
        const isAuthenticatedCookie = getCookie('authenticated');
        setAuthenticated(isAuthenticatedCookie === 'true');
        const isWorkerCookie = getCookie('isWorker');
        setIsWorker(isWorkerCookie === 'true');
    }, []);

    //PARA SABER SI ESTA AUTENTICADO
    const fetchAuthenticated = async () => {
        const response = await fetch('http://127.0.0.1:8000/comprobadorAutorizado');
        if (!response.ok) {
            throw new Error('Error al obtener la comprobación.');
        }
        const data = await response.text();
        setAuthenticated(data === 'true');
        document.cookie = `authenticated=${data === 'true'}; path=/`;
    };

    const fetchIsWorker = async () => {
        const response = await fetch('http://127.0.0.1:8000/comprobarWorker');
        if (!response.ok) {
            throw new Error('Error al obtener la comprobación.');
        }
        const data = await response.text();
        setIsWorker(data === 'true');
        document.cookie = `isWorker=${data === 'true'}; path=/`;
    };

    useEffect(() => {
        fetchAuthenticated();
        fetchIsWorker();
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

    //FUNCIÓN PARA PONER FECHA DE EXIRACIÓN A TODAS LAS COOKIES Y ASÍ ELIMINARLAS AL CERRAR SESIÓN
    const logout = () => {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
        setAuthenticated(false);
    };

    return (
        <Navbar className='navbar-custom' expand="lg" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand className='brand-custom'>GASSINKTATTOO</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto nav-custom">
                        <a href="/home">Inicio</a>
                        <a href="/tatuajes">Tatuajes</a>
                        <a href="/productos">Productos</a>
                        <a href="/merchandising">Merchandising</a>
                        {authenticated ? <a href="/carrito">Carrito</a> : null}
                        {authenticated ? null : <a href="/register">Registro</a>}
                        {authenticated ? null : <a href="/login">Inicio de sesión</a>}
                        {authenticated && isWorker ? <a href="/citas">Citas</a> : null}
                        {authenticated ? <a href="/perfil">Perfil</a> : null}
                        {authenticated ? <a href="/logout" onClick={logout}>Cerrar sesión</a> : null}
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;