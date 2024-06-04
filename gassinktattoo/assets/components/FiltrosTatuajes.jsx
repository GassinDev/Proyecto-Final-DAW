import React from 'react';
import Form from 'react-bootstrap/Form';
import '../styles/filtrosTatuajes.css';

const FiltrosTatuajes = () => {
    return (
        <div className="filters-container">
            <h4 className="filters-title">Filtros</h4>
            <Form className="filters-form">
                <Form.Group controlId="formEstilo">
                    <Form.Label className="filters-label">Estilo</Form.Label>
                    <div className="filters-checkboxes">
                        <Form.Check type="checkbox" label="Realismo" className="filter-checkbox" />
                        <Form.Check type="checkbox" label="Anime" className="filter-checkbox" />
                        <Form.Check type="checkbox" label="Tribales" className="filter-checkbox" />
                    </div>
                </Form.Group>
                <Form.Group controlId="formPrecio">
                    <Form.Label className="filters-label">Precio</Form.Label>
                    <Form.Select aria-label="Precio" className="filter-select">
                        <option value="asc">De menos a más</option>
                        <option value="desc">De más a menos</option>
                    </Form.Select>
                </Form.Group>
            </Form>
        </div>
    );
};

export default FiltrosTatuajes;