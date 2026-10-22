import React from 'react';
import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import './Buscador.css';

function Buscador(props) {
  const [busqueda, setBusqueda] = useState('');
  const [tipo, setTipo] = useState('pelicula');
  const [error, setError] = useState('');

  function controlarBusqueda(event) {
    setBusqueda(event.target.value);
  }

  function controlarTipo(event) {
    setTipo(event.target.value);
  }

  function enviarBusqueda(event) {
    event.preventDefault();

    if (busqueda === '') {
      setError('Ingresá una película o serie para buscar.');
    } else {
      setError('');
      props.history.push('/resultados/' + tipo + '/' + busqueda);
    }
  }

  return (
    <div>
      <form className="search-form" onSubmit={(event) => enviarBusqueda(event)}>
        <input type="text" name="searchData" placeholder="Buscar..." value={busqueda} onChange={(event) => controlarBusqueda(event)} />
        <select value={tipo} onChange={(event) => controlarTipo(event)}>
            <option value="pelicula">Películas</option>
            <option value="serie">Series</option>
          </select>
          <button type="submit" className="btn btn-success btn-sm">Buscar</button>
        </form>
        {error !== '' ? <p className="alert alert-warning">{error}</p> : ''}
      </div>
    );
  }


export default withRouter(Buscador);
