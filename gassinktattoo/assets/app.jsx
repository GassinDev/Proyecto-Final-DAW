import NavBar from './components/NavBar';
import './styles/app.css';
import { createRoot } from 'react-dom/client';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListadoProductos from './components/ListadoProductos';
import ListadoMerchandising from './components/ListadoMerchandising';

const navbar = document.getElementById('navbar');
if (navbar) {
    createRoot(navbar).render(<NavBar/>);
}

const productos = document.getElementById('productos');
if (productos) {
    createRoot(productos).render(<ListadoProductos/>);
}

const merchandising = document.getElementById('merchandising');
if (merchandising) {
    createRoot(merchandising).render(<ListadoMerchandising/>);
}