import React, { Component } from 'react';
import Filtro from '../../components/Filtro/Filtro';
import CardContenido from '../../components/CardContenido/CardContenido';
import Loader from '../../components/Loader/Loader';

class Series extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: '',
      seriesFiltradas: '',
      textoAFiltrar: '',
      pagina: 1
    };
  }

  componentDidMount() {
    fetch('https://api.themoviedb.org/3/tv/popular?api_key=3aafe306dbd0b67f8ff7460bcfc29518&language=es-AR&page=1')
      .then(response => response.json())
      .then(data => this.setState({
        series: data.results,
        seriesFiltradas: data.results
      }))
      .catch(function(error) {
        console.log('El error fue: ' + error);
      });
  }

  cargarMas() {
    let paginaSiguiente = this.state.pagina + 1;

    fetch('https://api.themoviedb.org/3/tv/popular?api_key=3aafe306dbd0b67f8ff7460bcfc29518&language=es-AR&page=' + paginaSiguiente)
      .then(response => response.json())
      .then(data => {
        let todasLasSeries = this.state.series.concat(data.results);
        this.setState({
          series: todasLasSeries,
          seriesFiltradas: todasLasSeries.filter(serie => serie.name.toLowerCase().includes(this.state.textoAFiltrar.toLowerCase())),
          pagina: paginaSiguiente
        });
      })
      .catch(function(error) {
        console.log('El error fue: ' + error);
      });
  }

  filtrarSeries(textoAFiltrar) {
    this.setState({
      textoAFiltrar: textoAFiltrar,
      seriesFiltradas: this.state.series.filter(serie => serie.name.toLowerCase().includes(textoAFiltrar.toLowerCase()))
    });
  }

  render() {
    return (
      <React.Fragment>
        <h2 className="alert alert-warning">Todas las series</h2>
        <Filtro filtrar={(textoAFiltrar) => this.filtrarSeries(textoAFiltrar)} />
        {this.state.series === '' ?
          <Loader /> :
          this.state.seriesFiltradas.length === 0 ?
            <p>No hay series que coincidan con la búsqueda</p> :
            <section className="row cards all-series" id="series">
              {this.state.seriesFiltradas.map(serie => <CardContenido key={serie.id} datos={serie} tipo="serie" />)}
            </section>
        }
        <button className="btn btn-warning mb-3" onClick={() => this.cargarMas()}>Cargar más</button>
      </React.Fragment>
    );
  }
}

export default Series;