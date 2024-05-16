import NavBar from './components/NavBar';
import './styles/app.css';
import { createRoot } from 'react-dom/client';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const navbar = document.getElementById('navbar');
if (navbar) {
    createRoot(navbar).render(<NavBar/>);
}