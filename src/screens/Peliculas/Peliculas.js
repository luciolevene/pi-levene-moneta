import React, { Component } from 'react';
import Filtro from '../../components/Filtro/Filtro';
import CardContenido from '../../components/CardContenido/CardContenido';
import Loader from '../../components/Loader/Loader';

class Peliculas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: '',
      peliculasFiltradas: '',
      textoAFiltrar: '',
      pagina: 1
    };
  }

  componentDidMount() {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=3aafe306dbd0b67f8ff7460bcfc29518&language=es-AR&page=1')
      .then(response => response.json())
      .then(data => this.setState({
        peliculas: data.results,
        peliculasFiltradas: data.results
      }))
      .catch(function(error) {
        console.log('El error fue: ' + error);
      });
  }

  cargarMas() {
    let paginaSiguiente = this.state.pagina + 1;

    fetch('https://api.themoviedb.org/3/movie/popular?api_key=3aafe306dbd0b67f8ff7460bcfc29518&language=es-AR&page=' + paginaSiguiente)
      .then(response => response.json())
      .then(data => {
        let todasLasPeliculas = this.state.peliculas.concat(data.results);
        this.setState({
          peliculas: todasLasPeliculas,
          peliculasFiltradas: todasLasPeliculas.filter(pelicula => pelicula.title.toLowerCase().includes(this.state.textoAFiltrar.toLowerCase())),
          pagina: paginaSiguiente
        });
      })
      .catch(function(error) {
        console.log('El error fue: ' + error);
      });
  }

  filtrarPeliculas(textoAFiltrar) {
    this.setState({
      textoAFiltrar: textoAFiltrar,
      peliculasFiltradas: this.state.peliculas.filter(pelicula => pelicula.title.toLowerCase().includes(textoAFiltrar.toLowerCase()))
    });
  }

  render() {
    return (
      <React.Fragment>
        <h2 className="alert alert-primary">Todas las películas</h2>
        <Filtro filtrar={(textoAFiltrar) => this.filtrarPeliculas(textoAFiltrar)} />
        {this.state.peliculas === '' ?
          <Loader /> :
          this.state.peliculasFiltradas.length === 0 ?
            <p>No hay películas que coincidan con la búsqueda</p> :
            <section className="row cards all-movies" id="movies">
              {this.state.peliculasFiltradas.map(pelicula => <CardContenido key={pelicula.id} datos={pelicula} tipo="pelicula" />)}
            </section>
        }
        <button className="btn btn-info mb-3" onClick={() => this.cargarMas()}>Cargar más</button>
      </React.Fragment>
    );
  }
}

export default Peliculas;