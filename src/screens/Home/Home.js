import React, { Component } from 'react';
import Buscador from '../../components/Buscador/Buscador';
import CardContenido from '../../components/CardContenido/CardContenido';
import { Link } from 'react-router-dom';
import './Home.css';

const URL_BASE = 'https://api.themoviedb.org/3';
const API_KEY = '3aafe306dbd0b67f8ff7460bcfc29518';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: [],
      series: [],
      cargandoPeliculas: true,
      cargandoSeries: true,
      error: ''
    };
  }

  componentDidMount() {
    let tipoListado = this.props.match.params.tipo;

    if (tipoListado === 'peliculas') {
      this.setState({ cargandoSeries: false });
      this.cargarPeliculas();
    } else if (tipoListado === 'series') {
      this.setState({ cargandoPeliculas: false });
      this.cargarSeries();
    } else {
      this.cargarPeliculas();
      this.cargarSeries();
    }
  }

  cargarPeliculas() {
    fetch(URL_BASE + '/movie/popular?api_key=' + API_KEY + '&language=es-AR&page=1')
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          this.setState({ peliculas: data.results, cargandoPeliculas: false });
        } else {
          this.setState({ cargandoPeliculas: false, error: 'No se pudieron cargar las películas.' });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ cargandoPeliculas: false, error: 'No se pudieron cargar las películas.' });
      });
  }

  cargarSeries() {
    fetch(URL_BASE + '/tv/popular?api_key=' + API_KEY + '&language=es-AR&page=1')
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          this.setState({ series: data.results, cargandoSeries: false });
        } else {
          this.setState({ cargandoSeries: false, error: 'No se pudieron cargar las series.' });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ cargandoSeries: false, error: 'No se pudieron cargar las series.' });
      });
  }

  renderizarSeccion(tipo, mostrarTodo) {
    let esPelicula = tipo === 'pelicula';
    let contenido = esPelicula ? this.state.peliculas : this.state.series;
    let cargando = esPelicula ? this.state.cargandoPeliculas : this.state.cargandoSeries;
    let titulo = esPelicula ? 'Películas populares' : 'Series populares';
    let ruta = esPelicula ? '/peliculas' : '/series';
    let contenidoAMostrar = mostrarTodo ? contenido : contenido.filter((elemento, idx) => idx < 4);

    return (
      <section className="seccion-home">
        <h2>{titulo}</h2>
        {cargando ? <p>Cargando {esPelicula ? 'películas' : 'series'}...</p> :
          contenidoAMostrar.length === 0 ? <p>No hay contenido disponible en este momento.</p> :
            <div className="grilla-tarjetas">
              {contenidoAMostrar.map((elemento) => <CardContenido key={elemento.id} datos={elemento} tipo={tipo} />)}
            </div>}
        {!mostrarTodo ? <Link className="ver-todas" to={ruta}>Ver todas las {esPelicula ? 'películas' : 'series'}</Link> : null}
      </section>
    );
  }

  render() {
    let tipoListado = this.props.match.params.tipo;
    let esListadoDePeliculas = tipoListado === 'peliculas';
    let esListadoDeSeries = tipoListado === 'series';

    if (esListadoDePeliculas || esListadoDeSeries) {
      return (
        <React.Fragment>
          {this.state.error !== '' ? <p className="error-home">{this.state.error}</p> : null}
          {this.renderizarSeccion(esListadoDePeliculas ? 'pelicula' : 'serie', true)}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Buscador />
        {this.state.error !== '' ? <p className="error-home">{this.state.error}</p> : null}
        {this.renderizarSeccion('pelicula', false)}
        {this.renderizarSeccion('serie', false)}
      </React.Fragment>
    );
  }
}

export default Home;
