import React from 'react';
import { useState, useEffect } from 'react';
import Filtro from '../../components/Filtro/Filtro';
import CardContenido from '../../components/CardContenido/CardContenido';
import Loader from '../../components/Loader/Loader';

function Series(props) {

  const [series, setSeries] = useState('');
  const [seriesFiltradas, setSeriesFiltradas] = useState('');
  const [textoAFiltrar, setTextoAFiltrar] = useState('');
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/tv/popular?api_key=3aafe306dbd0b67f8ff7460bcfc29518&language=es-AR&page=1')
      .then(response => response.json())
      .then(data => {
        setSeries(data.results);
        setSeriesFiltradas(data.results);
      })
      .catch(function(error) {
        console.log('El error fue: ' + error);
      });
  }, []);

  function cargarMas() {
    let paginaSiguiente = pagina + 1;

    fetch('https://api.themoviedb.org/3/tv/popular?api_key=3aafe306dbd0b67f8ff7460bcfc29518&language=es-AR&page=' + paginaSiguiente)
      .then(response => response.json())
      .then(data => {
        let idsActuales = series.map(serie => serie.id);
        let seriesNuevas = data.results.filter(serie => idsActuales.includes(serie.id) === false);
        let todasLasSeries = series.concat(seriesNuevas);
        setSeries(todasLasSeries);
        setSeriesFiltradas(todasLasSeries.filter(serie => serie.name.toLowerCase().includes(textoAFiltrar.toLowerCase())));
        setPagina(paginaSiguiente);
      })
      .catch(function(error) {
        console.log('El error fue: ' + error);
      });
  }

  function filtrarSeries(textoAFiltrar) {
    setTextoAFiltrar(textoAFiltrar);
    setSeriesFiltradas(series.filter(serie => serie.name.toLowerCase().includes(textoAFiltrar.toLowerCase())));
  }

  return (
    <React.Fragment>
      <h2 className="alert alert-warning">Todas las series</h2>
      <Filtro filtrar={(textoAFiltrar) => filtrarSeries(textoAFiltrar)} />
      {series === '' ?
        <Loader /> :
        seriesFiltradas.length === 0 ?
          <p>No hay series que coincidan con la búsqueda</p> :
          <section className="row cards all-series" id="series">
            {seriesFiltradas.map(serie => <CardContenido key={serie.id} datos={serie} tipo="serie" />)}
          </section>
      }
      <button className="btn btn-warning mb-3" onClick={() => cargarMas()}>Cargar más</button>
    </React.Fragment>
  );
}

export default Series;