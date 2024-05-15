import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar() {
    return (
        <Navbar variant="dark" bg="dark" expand="lg">
            <Navbar.Brand href="#home">GASS INK TATTOO</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Inicio</Nav.Link>
                    <Nav.Link href="#link">Acerca de</Nav.Link>
                    <Nav.Link href="#link">Productos</Nav.Link>
                    <Nav.Link href="#link">Tatuajes</Nav.Link>
                    <Nav.Link href="#link">Inicio de sesión</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;