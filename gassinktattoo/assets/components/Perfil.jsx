import React, { useState, useEffect } from 'react';
import ModalPedidos from './ModalPedidos';
import ModalCitas from './ModalCitas';
import '../styles/perfil.css';

const Perfil = () => {
    const [mostrarModalPedidos, setMostrarModalPedidos] = useState(false);
    const [mostrarModalCitas, setMostrarModalCitas] = useState(false);
    const [cliente, setCliente] = useState(null);

    useEffect(() => {
        fetch('/perfilDatos')
            .then(response => response.json())
            .then(data => setCliente(data))
            .catch(error => console.error('Error al obtener los datos del cliente:', error));
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
                            <button>Favoritos</button>
                            <button onClick={abrirModalCitas}>Citas</button>
                        </div>
                    </div>
                </>
            )}
            <ModalPedidos show={mostrarModalPedidos} onHide={cerrarModalPedidos} />
            <ModalCitas show={mostrarModalCitas} onHide={cerrarModalCitas} />
        </div>
    );
};

export default Perfil;