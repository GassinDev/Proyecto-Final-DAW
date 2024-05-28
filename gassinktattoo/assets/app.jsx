import NavBar from './components/NavBar';
import './styles/app.css';
import { createRoot } from 'react-dom/client';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListadoProductos from './components/ListadoProductos';
import ListadoMerchandising from './components/ListadoMerchandising';
import Carrito from './components/Carrito';
import RealizarPedido from './components/RealizarPedido';

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

const carrito = document.getElementById('carrito');
if (carrito) {
    createRoot(carrito).render(<Carrito/>);
}

const realizarPedido = document.getElementById('realizarPedido');
if (realizarPedido) {
    createRoot(realizarPedido).render(<RealizarPedido/>);
}