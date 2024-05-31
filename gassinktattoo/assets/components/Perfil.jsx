import React, { useState } from 'react';
import Pedidos from './Pedidos';

const Perfil = () => {
    const [mostrarModal, setMostrarModal] = useState(false);

    const abrirModal = () => {
        setMostrarModal(true);
    };

    const cerrarModal = () => {
        setMostrarModal(false);
    };

    return (
        <div>
            <button onClick={abrirModal}>Ver Pedidos</button>

            {mostrarModal && <Pedidos show={mostrarModal} onHide={cerrarModal} />}
        </div>
    );
};

export default Perfil;