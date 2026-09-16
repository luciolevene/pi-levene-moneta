import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './CardContenido.css';

const cookies = new Cookies();
const URL_IMAGEN = 'https://image.tmdb.org/t/p/w342';

class CardContenido extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostrarDescripcion: false,
      esFavorito: false
    };
  }

  componentDidMount() {
    this.actualizarEstadoFavorito();
  }

  actualizarEstadoFavorito() {
    let favoritosStorage = localStorage.getItem(this.obtenerClaveFavoritos());
    let favoritos = favoritosStorage === null ? [] : JSON.parse(favoritosStorage);

    this.setState({ esFavorito: favoritos.indexOf(this.props.datos.id) !== -1 });
  }

  obtenerClaveFavoritos() {
    return this.props.tipo === 'pelicula' ? 'favoritosPeliculas' : 'favoritosSeries';
  }

  cambiarDescripcion() {
    this.setState({ mostrarDescripcion: !this.state.mostrarDescripcion });
  }

  cambiarFavorito() {
    let clave = this.obtenerClaveFavoritos();
    let favoritosStorage = localStorage.getItem(clave);
    let favoritos = favoritosStorage === null ? [] : JSON.parse(favoritosStorage);
    let indiceFavorito = favoritos.indexOf(this.props.datos.id);

    if (indiceFavorito === -1) {
      favoritos.push(this.props.datos.id);
    } else {
      favoritos = favoritos.filter((id) => id !== this.props.datos.id);
    }

    localStorage.setItem(clave, JSON.stringify(favoritos));
    this.setState({ esFavorito: favoritos.indexOf(this.props.datos.id) !== -1 });
  }

  render() {
    let datos = this.props.datos;
    let titulo = this.props.tipo === 'pelicula' ? datos.title : datos.name;
    let rutaDetalle = this.props.tipo === 'pelicula' ? '/pelicula/' + datos.id : '/serie/' + datos.id;
    let usuarioEnSesion = cookies.get('user-auth-cookie');

    return (
      <article className="tarjeta-contenido">
        {datos.poster_path ? <img src={URL_IMAGEN + datos.poster_path} alt={titulo} /> : <div className="imagen-no-disponible">Imagen no disponible</div>}
        <div className="cuerpo-tarjeta">
          <h3>{titulo}</h3>
          {this.state.mostrarDescripcion ? <p>{datos.overview === '' ? 'Sin descripción disponible.' : datos.overview}</p> : null}
          <button type="button" onClick={() => this.cambiarDescripcion()}>
            {this.state.mostrarDescripcion ? 'Ocultar descripción' : 'Ver descripción'}
          </button>
          <Link className="enlace-detalle" to={rutaDetalle}>Ir a detalle</Link>
          {usuarioEnSesion ?
            <button type="button" onClick={() => this.cambiarFavorito()}>
              {this.state.esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            </button> : null}
        </div>
      </article>
    );
  }
}

export default CardContenido;
