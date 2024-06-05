import React, { useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../styles/filtros.css';

const FiltrosTatuajes = ({ onChange }) => {
    const [estilos, setEstilos] = useState([]);
    const [favoritos, setFavoritos] = useState(false);
    const [precio, setPrecio] = useState('');
    const formRef = useRef(null);

    const handleEstilosChange = (e) => {
        const value = e.target.value;
        const updatedEstilos = e.target.checked
            ? [...estilos, value]
            : estilos.filter(estilo => estilo !== value);
        setEstilos(updatedEstilos);
        onChange({ estilos: updatedEstilos, favoritos, precio });
    };

    const handleFavoritosChange = (e) => {
        const value = e.target.checked;
        setFavoritos(value);
        onChange({ estilos, favoritos: value, precio });
    };

    const handlePrecioChange = (e) => {
        const value = e.target.value;
        setPrecio(value);
        onChange({ estilos, favoritos, precio: value });
    };

    const resetearFiltros = () => {
        setEstilos([]);
        setFavoritos(false);
        setPrecio('');
        // REINICIAMOS LOS FORMULARIOS
        formRef.current.reset();
        onChange({ estilos: [], favoritos: false, precio: '' });
    };

    return (
        <div className="filters-container">
            <h4 className="filters-title">Filtros</h4>
            <Form ref={formRef} className="filters-form">
                <Form.Group controlId="formEstilo">
                    <Form.Label className="filters-label">Estilos</Form.Label>
                    <div className="filters-checkboxes m-3">
                        <Form.Check type="checkbox" label="Realismo" value="Realismo" className="filter-checkbox" onChange={handleEstilosChange} />
                        <Form.Check type="checkbox" label="Anime" value="Anime" className="filter-checkbox" onChange={handleEstilosChange} />
                        <Form.Check type="checkbox" label="Tribales" value="Tribales" className="filter-checkbox" onChange={handleEstilosChange} />
                    </div>
                </Form.Group>
                <Form.Group controlId="formGustos">
                    <Form.Label className="filters-label">Tus gustos</Form.Label>
                    <div className="filters-checkboxes  mb-3">
                        <Form.Check type="checkbox" label="Favoritos" className="filter-checkbox" onChange={handleFavoritosChange} />
                    </div>
                </Form.Group>
                <Form.Group controlId="formPrecio">
                    <Form.Label className="filters-label">Precio</Form.Label>
                    <Form.Select aria-label="Precio" className="filter-select" onChange={handlePrecioChange}>
                        <option value="">Seleccionar...</option>
                        <option value="asc">De menor a mayor</option>
                        <option value="desc">De mayor a menor</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="danger" className='mt-3' onClick={resetearFiltros}>Reiniciar filtros</Button>
            </Form>
        </div>
    );
};

export default FiltrosTatuajes;