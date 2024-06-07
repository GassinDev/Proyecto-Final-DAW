import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import CalendarioCitasCliente from './CalendarioCitasCliente';
import Fab from '@mui/material/Fab';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FiltrosTatuajes from './FiltrosTatuajes';
import Swal from 'sweetalert2';
import '../styles/spinner.css';
import '../styles/listadoTatuajes.css';

const ListadoTatuajes = () => {
    const [tatuajes, setTatuajes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedWorker, setSelectedWorker] = useState('');
    const [workers, setWorkers] = useState([]);
    const [selectedTatuaje, setSelectedTatuaje] = useState(null);
    const [descripcion, setDescripcion] = useState('');
    const [fechaHora, setFechaHora] = useState('');
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [filtros, setFiltros] = useState({ estilos: [], favoritos: false, price: '' });
    const [verificado, setVerificado] = useState(false);

    useEffect(() => {
        fetchTatuajes();
        fetchWorkers();
        const isAuthenticatedCookie = getCookie('authenticated');
        setAuthenticated(isAuthenticatedCookie === 'true');
        fetchVerificadoCookie();
    }, []);

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

    const fetchVerificadoCookie = () => {
        const isVerificadoCookie = getCookie('verificado');
        console.log('Cookie value:', isVerificadoCookie);
        if (isVerificadoCookie !== 'true') {
            fetchVerificado();
        } else {
            setVerificado(true);
        }
    };

    const fetchVerificado = async () => {
        const response = await fetch('http://127.0.0.1:8000/comprobarVerificado');
        if (!response.ok) {
            throw new Error('Error al obtener el resultado');
        }
        const data = await response.text();
        const isVerified = data === 'true';
        console.log('Fetched verification status:', isVerified);
        setVerificado(isVerified);
        document.cookie = `verificado=${isVerified}; path=/`;

    };

    const fetchTatuajes = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/tatuajes');

        if (!response.ok) {
            throw new Error('Error al obtener los tatuajes');
        }

        const data = await response.json();
        setTatuajes(data);
        setLoading(false);
    };

    const fetchWorkers = async () => {
        const response = await fetch('http://127.0.0.1:8000/workers');

        if (!response.ok) {
            throw new Error('Error al obtener los trabajadores');
        }

        const data = await response.json();
        setWorkers(data);
    };

    const handleSelectWorker = (tatuaje) => {
        setSelectedTatuaje(tatuaje);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            tatuajeId: selectedTatuaje.id,
            descripcion: descripcion,
            fechaHora: fechaHora,
            workerName: selectedWorker,
        };

        const response = await fetch('http://127.0.0.1:8000/realizarPeticion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Error al enviar la petición');
        }

        // Manejar la respuesta
        const result = await response.json();
        console.log(result);


        // Cerrar el modal y resetear el formulario
        setShowModal(false);
        setDescripcion('');
        setFechaHora('');
        setSelectedWorker('');
        Swal.fire({
            icon: 'success',
            title: 'Petición de cita realizada',
        });
    };

    const handleFavoriteClick = async (idTatuaje) => {
        const tatuaje = tatuajes.find(t => t.id === idTatuaje);
        if (tatuaje.favorito) {
            await handleRemoveFavorite(idTatuaje);
        } else {
            await handleAddFavorite(idTatuaje);
        }
    };

    const handleAddFavorite = async (idTatuaje) => {
        const response = await fetch(`http://127.0.0.1:8000/addFavorito/${idTatuaje}`, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('Error al agregar el tatuaje a favoritos');
        }

        fetchTatuajes();
    };

    const handleRemoveFavorite = async (idTatuaje) => {
        const response = await fetch(`http://127.0.0.1:8000/removeFavorito/${idTatuaje}`, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el tatuaje de favoritos');
        }

        fetchTatuajes();
    };

    // Función para mostrar la imagen en grande
    const handleShowImage = (imageSrc) => {
        setSelectedImage(imageSrc);
        setShowImageModal(true);
    };

    const handleFiltrosChange = (newFiltros) => {
        setFiltros(newFiltros);
    };

    const applyFilters = (tatuajes) => {
        let filteredTatuajes = tatuajes;

        if (filtros.estilos.length > 0) {
            filteredTatuajes = filteredTatuajes.filter(tatuaje =>
                filtros.estilos.includes(tatuaje.style)
            );
        }

        if (filtros.favoritos) {
            filteredTatuajes = filteredTatuajes.filter(tatuaje => tatuaje.favorito);
        }

        if (filtros.precio) {
            if (filtros.precio === 'asc') {
                filteredTatuajes = filteredTatuajes.sort((a, b) => a.price - b.price);
            } else if (filtros.precio === 'desc') {
                filteredTatuajes = filteredTatuajes.sort((a, b) => b.price - a.price);
            }
        }

        return filteredTatuajes;
    };

    if (loading) {
        return (
            <div className='spinner-container'>
                <Spinner animation="grow" className='spinner' />
            </div>
        );
    }

    const filteredTatuajes = applyFilters(tatuajes);

    return (
        <div className='container'>
            {!authenticated &&  <Alert variant="warning" className='alert'>Por favor, inicia sesión para pedir tu cita.</Alert>}
            {authenticated && !verificado && <Alert variant="warning" className='alert'>Por favor, verifique el email para pedir tu cita.</Alert>}
            <h2 className='text-center my-4'>Tatuajes</h2>
            <div className='row'>
                <div className='col-lg-3'>
                    <FiltrosTatuajes onChange={handleFiltrosChange} />
                </div>
                <div className='col-lg-9'>
                    <div className='row justify-content-center'>
                        {filteredTatuajes.map(tatuaje => (
                            <div key={tatuaje.id} className='col-lg-4 col-md-6 mb-4'>
                                <div className='card-container d-flex justify-content-center'>
                                    <Card className="custom-card">
                                        <Card.Img
                                            variant="top"
                                            src={"uploads/images/tatuajes/" + tatuaje.image}
                                            alt={tatuaje.name}
                                            className='custom-card-img'
                                            onClick={() => handleShowImage("uploads/images/tatuajes/" + tatuaje.image)}
                                        />
                                        <div className="like-button">
                                            <Fab aria-label="like" onClick={() => handleFavoriteClick(tatuaje.id)}>
                                                <FavoriteIcon style={{ color: tatuaje.favorito ? 'red' : 'black' }} />
                                            </Fab>
                                        </div>
                                        <Card.Body className='custom-card-body d-flex flex-column justify-content-center'>
                                            <Card.Title>{tatuaje.name}</Card.Title>
                                            <Card.Text>Desde {tatuaje.price}€</Card.Text>
                                            {/* Mostrar el botón solo si el usuario está autenticado */}
                                            {authenticated && verificado ? (
                                                <Button variant="success" onClick={() => handleSelectWorker(tatuaje)}>Pedir cita</Button>
                                            ) : (
                                                <Button disabled variant="success" onClick={() => handleSelectWorker(tatuaje)}>No puede pedir cita</Button>
                                            )}
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Modal para seleccionar el trabajador y ver su calendario */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton style={{ backgroundColor: 'white', color: 'black' }}>
                    <Modal.Title>Pide tu cita</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: 'black' }}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="selectWorker">
                            <Form.Label>Seleccionar Trabajador</Form.Label>
                            <Form.Select onChange={(e) => setSelectedWorker(e.target.value)} required>
                                <option value="">Seleccionar...</option>
                                {workers.map(worker => (
                                    <option key={worker.id} value={worker.username}>{worker.username}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="descripcion">
                            <Form.Label >Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="fechaHora">
                            <Form.Label>Fecha y Hora</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={fechaHora}
                                onChange={(e) => setFechaHora(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" className='m-1 mt-3' type="submit">Enviar</Button>
                    </Form>
                    {/* Mostrar el calendario del trabajador seleccionado */}
                    {selectedWorker && <CalendarioCitasCliente workerName={selectedWorker} />}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
            {/* Modal para mostrar la imagen en grande */}
            <Modal show={showImageModal} onHide={() => setShowImageModal(false)} size="lg">
                <Modal.Body>
                    <img src={selectedImage} alt="Imagen en grande" style={{ width: '100%' }} />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ListadoTatuajes;