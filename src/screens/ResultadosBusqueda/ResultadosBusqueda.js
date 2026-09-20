import React, { Component } from 'react';
import CardContenido from '../../components/CardContenido/CardContenido';

class ResultadosBusqueda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultados: ''
    };
  }

  componentDidMount() {
    let tipo = this.props.match.params.tipo;
    let busqueda = this.props.match.params.busqueda;
    let url = '';

    if (tipo === 'pelicula') {
      url = 'https://api.themoviedb.org/3/search/movie?api_key=3aafe306dbd0b67f8ff7460bcfc29518&language=es-AR&query=' + busqueda;
    } else {
      url = 'https://api.themoviedb.org/3/search/tv?api_key=3aafe306dbd0b67f8ff7460bcfc29518&language=es-AR&query=' + busqueda;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({
        resultados: data.results === undefined ? [] : data.results
      }))
      .catch(error => {
        console.log('El error fue: ' + error);
        this.setState({
          resultados: []
        });
      });
  }

  render() {
    let tipo = this.props.match.params.tipo;
    let busqueda = this.props.match.params.busqueda;
    let esPelicula = tipo === 'pelicula';
    let nombreTipo = esPelicula ? 'películas' : 'series';
    let idSeccion = esPelicula ? 'movies' : 'tv-show';

    return (
      <React.Fragment>
        <h2 className={esPelicula ? 'alert alert-primary' : 'alert alert-warning'}>
          Resultados de {nombreTipo} para: {busqueda}
        </h2>
        {this.state.resultados === '' ?
          <p>Cargando...</p> :
          this.state.resultados.length === 0 ?
            <p>No se encontraron resultados.</p> :
            <section className="row cards" id={idSeccion}>
              {this.state.resultados.map(resultado =>
                <CardContenido
                  key={resultado.id}
                  datos={resultado}
                  tipo={tipo}
                />
              )}
            </section>
        }
      </React.Fragment>
    );
  }
}

export default ResultadosBusqueda;
