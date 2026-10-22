import React from 'react';
import { useState } from 'react';
import './Filtro.css';

function Filtro(props) {
  const [textoAFiltrar, setTextoAFiltrar] = useState('');
  
  function evitarSubmit(event) {
    event.preventDefault();
  }

  function controlarCambios(event) {
    setTextoAFiltrar(event.target.value);
    props.filtrar(event.target.value);
  }

  return (
    <form className="filter-form px-0 mb-3" onSubmit={(event) => evitarSubmit(event)}>
      <input type="text" name="filter" placeholder="Buscar dentro de la lista" value={textoAFiltrar} onChange={(event) => controlarCambios(event)} />
    </form>
  );
}

export default Filtro;