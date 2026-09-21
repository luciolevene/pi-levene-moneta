import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Loader from '../../components/Loader/Loader';

const cookies = new Cookies();

class DetalleSerie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serie: '',
      esFavorito: false
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;

    fetch('https://api.themoviedb.org/3/tv/' + id + '?api_key=3aafe306dbd0b67f8ff7460bcfc29518&language=es-AR')
      .then(response => response.json())
      .then(data => {
        let storage = JSON.parse(localStorage.getItem('favoritos-serie'));
        let estaEnFavoritos = false;

        if (storage !== null) {
          estaEnFavoritos = storage.includes(data.id);
        }

        this.setState({
          serie: data,
          esFavorito: estaEnFavoritos
        });
      })
      .catch(function(error) {
        console.log('El error fue: ' + error);
      });
  }

  agregarFav(id) {
    let storage = JSON.parse(localStorage.getItem('favoritos-serie'));

    if (storage !== null) {
      storage.push(id);
      let storageString = JSON.stringify(storage);
      localStorage.setItem('favoritos-serie', storageString);
    } else {
      let nuevoStorage = [id];
      let storageString = JSON.stringify(nuevoStorage);
      localStorage.setItem('favoritos-serie', storageString);
    }

    this.setState({
      esFavorito: true
    });
  }

  sacarFav(id) {
    let storage = JSON.parse(localStorage.getItem('favoritos-serie'));
    let storageFiltrado = storage.filter(idGuardado => idGuardado !== id);
    let storageString = JSON.stringify(storageFiltrado);

    localStorage.setItem('favoritos-serie', storageString);
    this.setState({
      esFavorito: false
    });
  }

  render() {
    let usuarioEnSesion = cookies.get('user-auth-cookie');

    return (
      <React.Fragment>
        {this.state.serie === '' ?
          <Loader /> :
          <React.Fragment>
            <h2 className="alert alert-warning">{this.state.serie.name}</h2>
            <section className="row">
              <img className="col-md-6" src={'https://image.tmdb.org/t/p/w500' + this.state.serie.poster_path} alt={this.state.serie.name} />
              <section className="col-md-6 info">
                <h3>Descripción</h3>
                <p className="description">{this.state.serie.overview}</p>
                <p className="mt-0 mb-0" id="release-date"><strong>Fecha de estreno:</strong> {this.state.serie.first_air_date}</p>
                <p className="mt-0 mb-0" id="episodes"><strong>Número de capítulos:</strong> {this.state.serie.number_of_episodes}</p>
                <p className="mt-0 mb-0 seasons"><strong>Temporadas:</strong> {this.state.serie.number_of_seasons}</p>
                <p className="mt-0 mb-0" id="votes"><strong>Rating:</strong> {this.state.serie.vote_average}</p>
                <p className="mt-0"><strong>Géneros:</strong> {this.state.serie.genres.map(genero => <span key={genero.id}>{genero.name} </span>)}</p>
                {usuarioEnSesion ?
                  this.state.esFavorito ?
                    <button className="btn alert-primary" onClick={() => this.sacarFav(this.state.serie.id)}>♥️</button> :
                    <button className="btn alert-primary" onClick={() => this.agregarFav(this.state.serie.id)}>🩶</button>
                  : ''}
              </section>
            </section>
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}

export default DetalleSerie;