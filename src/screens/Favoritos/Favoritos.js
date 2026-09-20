import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import CardContenido from '../../components/CardContenido/CardContenido';

const cookies = new Cookies();

class Favoritos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: '',
      series: ''
    };
  }

  componentDidMount() {
    let usuarioEnSesion = cookies.get('user-auth-cookie');

    if (usuarioEnSesion === undefined) {
      this.props.history.push('/login');
    } else {
      let storagePeliculas = JSON.parse(localStorage.getItem('favoritos-pelicula'));
      let peliculasRecuperadas = [];

      if (storagePeliculas !== null && storagePeliculas.length > 0) {
        storagePeliculas.forEach(id => {
          fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=3aafe306dbd0b67f8ff7460bcfc29518&language=es-AR')
            .then(response => response.json())
            .then(data => {
              peliculasRecuperadas = peliculasRecuperadas.concat(data);
              this.setState({
                peliculas: peliculasRecuperadas
              });
            })
            .catch(function(error) {
              console.log('El error fue: ' + error);
            });
        });
      } else {
        this.setState({
          peliculas: []
        });
      }

      let storageSeries = JSON.parse(localStorage.getItem('favoritos-serie'));
      let seriesRecuperadas = [];

      if (storageSeries !== null && storageSeries.length > 0) {
        storageSeries.forEach(id => {
          fetch('https://api.themoviedb.org/3/tv/' + id + '?api_key=3aafe306dbd0b67f8ff7460bcfc29518&language=es-AR')
            .then(response => response.json())
            .then(data => {
              seriesRecuperadas = seriesRecuperadas.concat(data);
              this.setState({
                series: seriesRecuperadas
              });
            })
            .catch(function(error) {
              console.log('El error fue: ' + error);
            });
        });
      } else {
        this.setState({
          series: []
        });
      }
    }
  }

  borrarPelicula(id) {
    this.setState({
      peliculas: this.state.peliculas.filter(pelicula => pelicula.id !== id)
    });
  }

  borrarSerie(id) {
    this.setState({
      series: this.state.series.filter(serie => serie.id !== id)
    });
  }

  render() {
    return (
      <React.Fragment>
        <h2 className="alert alert-primary">Películas favoritas</h2>
        {this.state.peliculas === '' ?
          <p>Cargando...</p> :
          this.state.peliculas.length === 0 ?
            <p>Todavía no agregaste películas a favoritos</p> :
            <section className="row cards" id="movies">
              {this.state.peliculas.map(pelicula => <CardContenido key={pelicula.id} datos={pelicula} tipo="pelicula" borrar={(id) => this.borrarPelicula(id)} />)}
            </section>
        }
        <h2 className="alert alert-warning">Series favoritas</h2>
        {this.state.series === '' ?
          <p>Cargando...</p> :
          this.state.series.length === 0 ?
            <p>Todavía no agregaste series a favoritos</p> :
            <section className="row cards" id="tv-show">
              {this.state.series.map(serie => <CardContenido key={serie.id} datos={serie} tipo="serie" borrar={(id) => this.borrarSerie(id)} />)}
            </section>
        }
      </React.Fragment>
    );
  }
}

export default Favoritos;