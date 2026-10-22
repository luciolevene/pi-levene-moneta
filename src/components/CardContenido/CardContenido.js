import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './CardContenido.css';

const cookies = new Cookies();

function CardContenido(props) {
  const [verDescripcion, setVerDescripcion] = useState(false);
  const [esFavorito, setEsFavorito] = useState(false);

  useEffect(() => {
    let storage = JSON.parse(localStorage.getItem('favoritos-' + props.tipo));
    if (storage !== null) {
      let estaEnFavoritos = storage.includes(props.datos.id);
      setEsFavorito(estaEnFavoritos);
    }
  }, [props.tipo, props.datos.id]);

  function mostrarDescripcion() {
    if (verDescripcion) {
      setVerDescripcion(false);
    } else {
      setVerDescripcion(true);
    }
  }

  function agregarFav(id) {
    let storage = JSON.parse(localStorage.getItem('favoritos-' + props.tipo));
    if (storage !== null) {
      storage.push(id);
      let storageString = JSON.stringify(storage);
      localStorage.setItem('favoritos-' + props.tipo, storageString);
    } else {
      let nuevoStorage = [id];
      let storageString = JSON.stringify(nuevoStorage);
      localStorage.setItem('favoritos-' + props.tipo, storageString);
    }
    setEsFavorito(true);
  }

  function sacarFav(id) {
    let storage = JSON.parse(localStorage.getItem('favoritos-' + props.tipo));
    let storageFiltrado = storage.filter(idGuardado => idGuardado !== id);
    let storageString = JSON.stringify(storageFiltrado);
    localStorage.setItem('favoritos-' + props.tipo, storageString);
    setEsFavorito(false);

    if (props.borrar !== undefined) {
      props.borrar(id);
    }
  }


  let titulo = props.tipo === 'pelicula' ? props.datos.title : props.datos.name;
  let claseTarjeta = props.tipo === 'pelicula' ? 'single-card-movie' : 'single-card-tv';
  let usuarioEnSesion = cookies.get('user-auth-cookie');

    return (
      <article className={claseTarjeta}>
        <img src={'https://image.tmdb.org/t/p/w342' + props.datos.poster_path} className="card-img-top" alt={titulo} />
        <div className="cardBody">
          <h5 className="card-title">{titulo}</h5>
          {verDescripcion ? <p className="card-text">{props.datos.overview}</p> : ''}
          <button className="btn alert-primary" onClick={() => mostrarDescripcion()}>
            {verDescripcion ? 'Ocultar descripción' : 'Ver descripción'}
          </button>
          <Link className="btn btn-primary" to={'/' + props.tipo + '/' + props.datos.id}>Ir a detalle</Link>
          {usuarioEnSesion ?
            esFavorito ?
              <button className="btn alert-primary" onClick={() => sacarFav(props.datos.id)}>♥️</button> :
              <button className="btn alert-primary" onClick={() => agregarFav(props.datos.id)}>🩶</button>
            : ''}
        </div>
      </article>
    );
  }

export default CardContenido;