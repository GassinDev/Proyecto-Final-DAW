import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import '../styles/errorRuta.css';

const ErrorRuta = () => {
    return (
        <div className="error-container">
            <FaExclamationTriangle className="error-icon" />
            <h1 className="error-title">Error 404</h1>
            <p className="error-text">La página que estás buscando no pudo ser encontrada.</p>
        </div>
    );
};

export default ErrorRuta;