import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import '../styles/favoritosPerfil.css';

const FavoritosPerfil = () => {
    const [favoritos, setFavoritos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        fetch('/tatooFavoritos')
            .then(response => response.json())
            .then(data => {
                setFavoritos(data);
                setLoading(false);
            })
            .catch(error => console.error('Error al obtener los tatuajes favoritos:', error));
    }, []);

    const handleImageClick = (imageSrc) => {
        setSelectedImage(imageSrc);
        setShowModal(true);
    }

    return (
        <div className='container mt-5 mb-5'>
            <h3 className='text-center'>Mis tatuajes favoritos</h3>
            {loading ? (
                <div className='spinner-container'>
                    <Spinner animation="grow" className='spinner' />
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                    {favoritos.map((tatuaje, index) => (
                        <div key={index} className="col mb-4">
                            <Card className="favorito-card" onClick={() => handleImageClick(`uploads/images/tatuajes/${tatuaje.imageTatuaje}`)}>
                                <Card.Img
                                    variant="top"
                                    src={`uploads/images/tatuajes/${tatuaje.imageTatuaje}`}
                                    alt={tatuaje.nombreTatuaje}
                                    className="favorito-img"
                                />
                                <Card.Body className="favorito-body">
                                    <Card.Title>{tatuaje.nombreTatuaje}</Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            )}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Body>
                    <img src={selectedImage} alt="Tatuaje Ampliado" className="w-100" />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default FavoritosPerfil;