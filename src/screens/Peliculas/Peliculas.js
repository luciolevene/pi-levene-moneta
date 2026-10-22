import React from 'react';
import { useState, useEffect } from 'react';
import Filtro from '../../components/Filtro/Filtro';
import CardContenido from '../../components/CardContenido/CardContenido';
import Loader from '../../components/Loader/Loader';

function Peliculas(props) {

  const [peliculas, setPeliculas] = useState('');
  const [peliculasFiltradas, setPeliculasFiltradas] = useState('');
  const [textoAFiltrar, setTextoAFiltrar] = useState('');
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=3aafe306dbd0b67f8ff7460bcfc29518&language=es-AR&page=1')
      .then(response => response.json())
      .then(data => {
        setPeliculas(data.results);
        setPeliculasFiltradas(data.results);
      })
      .catch(function(error) {
        console.log('El error fue: ' + error);
      });
  }, []);

  function cargarMas() {
    let paginaSiguiente = pagina + 1;

    fetch('https://api.themoviedb.org/3/movie/popular?api_key=3aafe306dbd0b67f8ff7460bcfc29518&language=es-AR&page=' + paginaSiguiente)
      .then(response => response.json())
      .then(data => {
        let idsActuales = peliculas.map(pelicula => pelicula.id);
        let peliculasNuevas = data.results.filter(pelicula => idsActuales.includes(pelicula.id) === false);
        let todasLasPeliculas = peliculas.concat(peliculasNuevas);
        setPeliculas(todasLasPeliculas);
        setPeliculasFiltradas(todasLasPeliculas.filter(pelicula => pelicula.title.toLowerCase().includes(textoAFiltrar.toLowerCase())));
        setPagina(paginaSiguiente);
      })
      .catch(function(error) {
        console.log('El error fue: ' + error);
      });
  }

  function filtrarPeliculas(textoAFiltrar) {
    setTextoAFiltrar(textoAFiltrar);
    setPeliculasFiltradas(peliculas.filter(pelicula => pelicula.title.toLowerCase().includes(textoAFiltrar.toLowerCase())));
  }

  return (
    <React.Fragment>
      <h2 className="alert alert-primary">Todas las películas</h2>
      <Filtro filtrar={(textoAFiltrar) => filtrarPeliculas(textoAFiltrar)} />
      {peliculas === '' ?
        <Loader /> :
        peliculasFiltradas.length === 0 ?
          <p>No hay películas que coincidan con la búsqueda</p> :
          <section className="row cards all-movies" id="movies">
            {peliculasFiltradas.map(pelicula => <CardContenido key={pelicula.id} datos={pelicula} tipo="pelicula" />)}
          </section>
      }
      <button className="btn btn-info mb-3" onClick={() => cargarMas()}>Cargar más</button>
    </React.Fragment>
  );
}

export default Peliculas;