import React, { useState, useRef, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../styles/filtros.css';

const FiltrosMerchandising = ({ onChange }) => {

    const [datosTipos, setDatosTipos] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [precio, setPrecio] = useState('');
    const formRef = useRef(null);

    useEffect(() => {
        fetchDatosTipos();
    }, []);

    const fetchDatosTipos = async () => {
        const response = await fetch('http://localhost:8000/api/merchandising/tipos');

        if (!response.ok) {
            throw new Error('Error al obtener los tipos de merchandising');
        }
        const data = await response.json();
        setDatosTipos(data);
    };

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
                <Form.Group>
                    <Form.Label className="filters-label">Tipo</Form.Label>
                    <div className="filters-checkboxes m-3">
                        {datosTipos.map((tipo) => (
                            <Form.Check key={tipo} type="checkbox" label={tipo} value={tipo} className="filter-checkbox" onChange={handleTiposChange} />
                        ))}
                    </div>
                </Form.Group>
                <Form.Group>
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