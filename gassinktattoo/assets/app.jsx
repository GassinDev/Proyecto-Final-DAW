import React from 'react';
import NavBar from './components/NavBar';
import { createRoot } from 'react-dom/client';
import './app.css';

const root = createRoot(document.getElementById('navbar'));
if(root){
    root.render(<NavBar />);
}


