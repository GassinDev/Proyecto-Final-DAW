import React from 'react';
import { FaUserLock } from 'react-icons/fa';
import '../styles/errorRuta.css';

const AccessDenied = () => {
    return (
        <div className="error-container">
            <FaUserLock className="error-icon" />
            <h1 className="error-title">Acceso denegado</h1>
            <p className="error-text">No tienes permiso para acceder a esta página.</p>
        </div>
    );
};

export default AccessDenied;