import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import '../styles/imagenesInicio.css';

const ImagenesInicio = () => {
    return (
        <div className="image-gallery mt-3">
            <div className="images-container">
                <a href="/tatuajes">
                    <div className="image-wrapper">

                        <img src="./images/mujerTatuada.avif" alt="Image 1" className="gallery-image" />
                        
                        <div className="image-text">Tatuajes Premium</div>
                    </div>
                </a>
                <a href="/productos">
                    <div className="image-wrapper">

                        <img src="./images/cura.jpg" alt="Image 2" className="gallery-image" />

                        <div className="image-text">Cuida tu Tatuaje</div>
                    </div>
                </a>
                <a href="/merchandising">
                    <div className="image-wrapper">

                        <img src="./images/camiseta.jpg" alt="Image 3" className="gallery-image" />

                        <div className="image-text">Merchandising Único</div>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default ImagenesInicio;