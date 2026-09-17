import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './CardContenido.css';

const cookies = new Cookies();

class CardContenido extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verDescripcion: false,
      esFavorito: false
    };
  }

  componentDidMount() {
    let storage = JSON.parse(localStorage.getItem('favoritos-' + this.props.tipo));
    if (storage !== null) {
      let estaEnFavoritos = storage.includes(this.props.datos.id);
      this.setState({
        esFavorito: estaEnFavoritos
      });
    }
  }

  mostrarDescripcion() {
    if (this.state.verDescripcion) {
      this.setState({
        verDescripcion: false
      });
    } else {
      this.setState({
        verDescripcion: true
      });
    }
  }

  agregarFav(id) {
    let storage = JSON.parse(localStorage.getItem('favoritos-' + this.props.tipo));
    if (storage !== null) {
      storage.push(id);
      let storageString = JSON.stringify(storage);
      localStorage.setItem('favoritos-' + this.props.tipo, storageString);
    } else {
      let nuevoStorage = [id];
      let storageString = JSON.stringify(nuevoStorage);
      localStorage.setItem('favoritos-' + this.props.tipo, storageString);
    }
    this.setState({
      esFavorito: true
    });
  }

  sacarFav(id) {
    let storage = JSON.parse(localStorage.getItem('favoritos-' + this.props.tipo));
    let storageFiltrado = storage.filter(idGuardado => idGuardado !== id);
    let storageString = JSON.stringify(storageFiltrado);
    localStorage.setItem('favoritos-' + this.props.tipo, storageString);
    this.setState({
      esFavorito: false
    });
  }

  render() {
    let titulo = this.props.tipo === 'pelicula' ? this.props.datos.title : this.props.datos.name;
    let claseTarjeta = this.props.tipo === 'pelicula' ? 'single-card-movie' : 'single-card-tv';
    let usuarioEnSesion = cookies.get('user-auth-cookie');

    return (
      <article className={claseTarjeta}>
        <img src={'https://image.tmdb.org/t/p/w342' + this.props.datos.poster_path} className="card-img-top" alt={titulo} />
        <div className="cardBody">
          <h5 className="card-title">{titulo}</h5>
          {this.state.verDescripcion ? <p className="card-text">{this.props.datos.overview}</p> : ''}
          <button className="btn alert-primary" onClick={() => this.mostrarDescripcion()}>
            {this.state.verDescripcion ? 'Ocultar descripción' : 'Ver descripción'}
          </button>
          <Link className="btn btn-primary" to={'/' + this.props.tipo + '/' + this.props.datos.id}>Ir a detalle</Link>
          {usuarioEnSesion ?
            this.state.esFavorito ?
              <button className="btn alert-primary" onClick={() => this.sacarFav(this.props.datos.id)}>♥️</button> :
              <button className="btn alert-primary" onClick={() => this.agregarFav(this.props.datos.id)}>🩶</button>
            : ''}
        </div>
      </article>
    );
  }
}

export default CardContenido;