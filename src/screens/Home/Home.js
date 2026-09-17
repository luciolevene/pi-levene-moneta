import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Buscador from '../../components/Buscador/Buscador';
import CardContenido from '../../components/CardContenido/CardContenido';

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

        <h2 className="alert alert-primary">Películas populares</h2>
        <section className="row cards" id="movies">
          {this.state.peliculas === '' ?
            <p>Cargando...</p> :
            this.state.peliculas.map((pelicula, idx) => idx < 4 ? <CardContenido key={pelicula.id} datos={pelicula} tipo="pelicula" /> : '')
          }
        </section>
        <Link className="btn btn-info mb-3" to="/peliculas">Ver todas las películas</Link>

        <h2 className="alert alert-warning">Series populares</h2>
        <section className="row cards" id="tv-show">
          {this.state.series === '' ?
            <p>Cargando...</p> :
            this.state.series.map((serie, idx) => idx < 4 ? <CardContenido key={serie.id} datos={serie} tipo="serie" /> : '')
          }
        </section>
        <Link className="btn btn-info mb-3" to="/series">Ver todas las series</Link>
      </React.Fragment>
    );
  }
}

export default Home;