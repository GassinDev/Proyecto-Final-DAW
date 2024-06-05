import React, { useState, useEffect } from 'react';
import ModalPedidos from './ModalPedidos';
import ModalCitas from './ModalCitas';
import '../styles/perfil.css';
import ModalCitasSolicitadas from './ModalCitasSolicitadas';

const Perfil = () => {
    const [mostrarModalPedidos, setMostrarModalPedidos] = useState(false);
    const [mostrarModalCitas, setMostrarModalCitas] = useState(false);
    const [mostrarModalCitasSolicitadas, setMostrarModalCitasSolicitadas] = useState(false);
    const [cliente, setCliente] = useState(null);
    const [isWorker, setIsWorker] = useState(false);

    useEffect(() => {
        fetch('/perfilDatos')
            .then(response => response.json())
            .then(data => setCliente(data))
            .catch(error => console.error('Error al obtener los datos del cliente:', error));

        const isWorkerCookie = getCookie('isWorker');
        setIsWorker(isWorkerCookie === 'true');
    }, []);

    const abrirModalPedidos = () => {
        setMostrarModalPedidos(true);
    };

    const cerrarModalPedidos = () => {
        setMostrarModalPedidos(false);
    };

    const abrirModalCitas = () => {
        setMostrarModalCitas(true);
    };

    const cerrarModalCitas = () => {
        setMostrarModalCitas(false);
    };

    const abrirModalCitasSolicitadas = () => {
        setMostrarModalCitasSolicitadas(true);
    };

    const cerrarModalCitasSolicitadas = () => {
        setMostrarModalCitasSolicitadas(false);
    };

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

    return (
        <div className="profile-container">
            {cliente && (
                <>
                    <div
                        className="profile-banner"
                        style={{ backgroundImage: `url(uploads/images/fotosPerfil/${cliente.image})` }}
                    ></div>
                    <div className="profile-details">
                        <div className="profile-info">
                            <img
                                src={"uploads/images/fotosPerfil/" + cliente.image}
                                alt="Imagen de perfil"
                                className="profile-image"
                            />
                            <p>Username: {cliente.username}</p>
                            <p>Email: {cliente.email}</p>
                        </div>
                        <div className="profile-buttons">
                            <button onClick={abrirModalPedidos}>Ver Pedidos</button>
                            {!isWorker && <button onClick={abrirModalCitas}>Peticiones de citas</button>}
                            {isWorker && <button onClick={abrirModalCitasSolicitadas}>Citas solicitadas / aceptadas</button>}
                        </div>
                    </div>
                </>
            )}
            <ModalPedidos show={mostrarModalPedidos} onHide={cerrarModalPedidos} />
            <ModalCitas show={mostrarModalCitas} onHide={cerrarModalCitas} />
            <ModalCitasSolicitadas show={mostrarModalCitasSolicitadas} onHide={cerrarModalCitasSolicitadas} />
        </div>

    );
};

export default Perfil;