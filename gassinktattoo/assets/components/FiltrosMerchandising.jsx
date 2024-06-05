import React, { useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../styles/filtros.css';

const FiltrosMerchandising = ({ onChange }) => {

    const [tipos, setTipos] = useState([]);
    const [precio, setPrecio] = useState('');
    const formRef = useRef(null);

    const handleTiposChange = (e) => {
        const value = e.target.value;
        const updatedTipos = e.target.checked
            ? [...tipos, value]
            : tipos.filter(tipos => tipos !== value);
        setTipos(updatedTipos);
        onChange({ tipos: updatedTipos, precio });
    };

    const handlePrecioChange = (e) => {
        const value = e.target.value;
        setPrecio(value);
        onChange({ tipos, precio: value });
    };

    const resetearFiltros = () => {
        setTipos([]);
        setPrecio('');
        // REINICIAMOS LOS FORMULARIOS
        formRef.current.reset();
        onChange({ tipos: [], precio: '' });
    };

    return (
        <div className="filters-container">
            <h4 className="filters-title">Filtros</h4>
            <Form ref={formRef} className="filters-form">
                <Form.Group controlId="formEstilo">
                    <Form.Label className="filters-label">Tipo</Form.Label>
                    <div className="filters-checkboxes m-3">
                        <Form.Check type="checkbox" label="Camisetas" value="Camiseta" className="filter-checkbox" onChange={handleTiposChange} />
                        <Form.Check type="checkbox" label="Sudaderas" value="Sudadera" className="filter-checkbox" onChange={handleTiposChange} />
                        <Form.Check type="checkbox" label="Bolsos" value="Bolso" className="filter-checkbox" onChange={handleTiposChange} />
                        <Form.Check type="checkbox" label="Otros" value="Otros" className="filter-checkbox" onChange={handleTiposChange} />
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

export default FiltrosMerchandising;