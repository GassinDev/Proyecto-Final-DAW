import NavBar from './components/NavBar';
import { createRoot } from 'react-dom/client';
import React from 'react';
import ListadoProductos from './components/ListadoProductos';
import ListadoMerchandising from './components/ListadoMerchandising';
import Carrito from './components/Carrito';
import RealizarPedido from './components/RealizarPedido';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.css';
import BannerVideo from './components/BannerVideo';
import Footer from './components/Footer';
import Perfil from './components/Perfil';
import ListadoTatuajes from './components/ListadoTatuajes';
import CalendarioCitasWorker from './components/CalendarioCitasWorker';
import ImagenesInicio from './components/ImagenesInicio';
import FooterTwo from './components/FooterTwo';
import ErrorRuta from './components/ErrorRuta';
import AccessDenied from './components/AccessDenied';


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

const bannerVideo = document.getElementById('bannerVideo');
if (bannerVideo) {
    createRoot(bannerVideo).render(<BannerVideo/>);
}

const footer = document.getElementById('footer');
if (footer) {
    createRoot(footer).render(<Footer/>);
}

const footerTwo = document.getElementById('footerTwo');
if (footerTwo) {
    createRoot(footerTwo).render(<FooterTwo/>);
}

const perfil = document.getElementById('perfil');
if (perfil) {
    createRoot(perfil).render(<Perfil/>);
}

const tatuajes = document.getElementById('tatuajes');
if (tatuajes) {
    createRoot(tatuajes).render(<ListadoTatuajes/>);
}

const calendario = document.getElementById('calendario');
if (calendario) {
    createRoot(calendario).render(<CalendarioCitasWorker/>);
}

const imagenesInicio = document.getElementById('imagenesInicio');
if (imagenesInicio) {
    createRoot(imagenesInicio).render(<ImagenesInicio/>);
}

const errorRuta = document.getElementById('errorRuta');
if (errorRuta) {
    createRoot(errorRuta).render(<ErrorRuta/>);
}

const accessDenied = document.getElementById('accessDenied');
if (accessDenied) {
    createRoot(accessDenied).render(<AccessDenied/>);
}