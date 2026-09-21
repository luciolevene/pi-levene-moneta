import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Loader from '../../components/Loader/Loader';

const cookies = new Cookies();

class DetallePelicula extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pelicula: '',
      esFavorito: false
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;

    fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=3aafe306dbd0b67f8ff7460bcfc29518&language=es-AR')
      .then(response => response.json())
      .then(data => {
        let storage = JSON.parse(localStorage.getItem('favoritos-pelicula'));
        let estaEnFavoritos = false;

        if (storage !== null) {
          estaEnFavoritos = storage.includes(data.id);
        }

        this.setState({
          pelicula: data,
          esFavorito: estaEnFavoritos
        });
      })
      .catch(function(error) {
        console.log('El error fue: ' + error);
      });
  }

  agregarFav(id) {
    let storage = JSON.parse(localStorage.getItem('favoritos-pelicula'));

    if (storage !== null) {
      storage.push(id);
      let storageString = JSON.stringify(storage);
      localStorage.setItem('favoritos-pelicula', storageString);
    } else {
      let nuevoStorage = [id];
      let storageString = JSON.stringify(nuevoStorage);
      localStorage.setItem('favoritos-pelicula', storageString);
    }

    this.setState({
      esFavorito: true
    });
  }

  sacarFav(id) {
    let storage = JSON.parse(localStorage.getItem('favoritos-pelicula'));
    let storageFiltrado = storage.filter(idGuardado => idGuardado !== id);
    let storageString = JSON.stringify(storageFiltrado);

    localStorage.setItem('favoritos-pelicula', storageString);
    this.setState({
      esFavorito: false
    });
  }

  render() {
    let usuarioEnSesion = cookies.get('user-auth-cookie');

    return (
      <React.Fragment>
        {this.state.pelicula === '' ?
          <Loader /> :
          <React.Fragment>
            <h2 className="alert alert-primary">{this.state.pelicula.title}</h2>
            <section className="row">
              <img className="col-md-6" src={'https://image.tmdb.org/t/p/w500' + this.state.pelicula.poster_path} alt={this.state.pelicula.title} />
              <section className="col-md-6 info">
                <h3>Descripción</h3>
                <p className="description">{this.state.pelicula.overview}</p>
                <p className="mt-0 mb-0" id="release-date"><strong>Fecha de estreno:</strong> {this.state.pelicula.release_date}</p>
                <p className="mt-0 mb-0 length"><strong>Duración:</strong> {this.state.pelicula.runtime}</p>
                <p className="mt-0 mb-0" id="votes"><strong>Rating:</strong> {this.state.pelicula.vote_average}</p>
                <p className="mt-0"><strong>Géneros:</strong> {this.state.pelicula.genres.map(genero => <span key={genero.id}>{genero.name} </span>)}</p>
                {usuarioEnSesion ?
                  this.state.esFavorito ? 
                    <button className="btn alert-primary" onClick={() => this.sacarFav(this.state.pelicula.id)}>♥️</button> :
                    <button className="btn alert-primary" onClick={() => this.agregarFav(this.state.pelicula.id)}>🩶</button>
                  : ''}
              </section>
            </section>
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}

export default DetallePelicula;