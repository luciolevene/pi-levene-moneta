import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Buscador from '../../components/Buscador/Buscador';
import CardContenido from '../../components/CardContenido/CardContenido';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: '',
      series: ''
    };
  }

  componentDidMount() {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=3aafe306dbd0b67f8ff7460bcfc29518&language=es-AR')
      .then(response => response.json())
      .then(data => this.setState({
        peliculas: data.results
      }))
      .catch(function(error) {
        console.log('El error fue: ' + error);
      });

    fetch('https://api.themoviedb.org/3/tv/popular?api_key=3aafe306dbd0b67f8ff7460bcfc29518&language=es-AR')
      .then(response => response.json())
      .then(data => this.setState({
        series: data.results
      }))
      .catch(function(error) {
        console.log('El error fue: ' + error);
      });
  }

  render() {
    return (
      <React.Fragment>
        <Buscador />

        <section className="seccion-home">
          <h2>Películas populares</h2>
          {this.state.peliculas === '' ?
            <p>Cargando...</p> :
            <div className="grilla-tarjetas">
              {this.state.peliculas.map((pelicula, idx) => idx < 4 ? <CardContenido key={pelicula.id} datos={pelicula} tipo="pelicula" /> : null)}
            </div>
          }
          <Link className="ver-todas" to="/peliculas">Ver todas las películas</Link>
        </section>

        <section className="seccion-home">
          <h2>Series populares</h2>
          {this.state.series === '' ?
            <p>Cargando...</p> :
            <div className="grilla-tarjetas">
              {this.state.series.map((serie, idx) => idx < 4 ? <CardContenido key={serie.id} datos={serie} tipo="serie" /> : null)}
            </div>
          }
          <Link className="ver-todas" to="/series">Ver todas las series</Link>
        </section>
      </React.Fragment>
    );
  }
}

export default Home;