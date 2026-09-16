import React from 'react';

function PantallaProvisoria(props) {
  return (
    <section className="pantalla-provisoria">
      <h2>{props.titulo}</h2>
      <p>{props.texto}</p>
    </section>
  );
}

function Favoritos() {
  return <PantallaProvisoria titulo="Mis favoritos" texto="Acá se verán tus películas y series favoritas." />;
}

function CrearCuenta() {
  return <PantallaProvisoria titulo="Crear cuenta" texto="Acá estará el formulario de registro." />;
}

function Login() {
  return <PantallaProvisoria titulo="Login" texto="Acá estará el formulario para iniciar sesión." />;
}

function Resultados(props) {
  let tipo = props.match.params.tipo === 'pelicula' ? 'películas' : 'series';
  return <PantallaProvisoria titulo="Resultados de búsqueda" texto={'Acá se buscarán ' + tipo + ' para: ' + props.match.params.busqueda} />;
}

function DetallePelicula() {
  return <PantallaProvisoria titulo="Detalle de película" texto="Acá se mostrarán los datos completos de la película elegida." />;
}

function DetalleSerie() {
  return <PantallaProvisoria titulo="Detalle de serie" texto="Acá se mostrarán los datos completos de la serie elegida." />;
}

function NoEncontrada() {
  return <PantallaProvisoria titulo="404" texto="La página que buscás no existe." />;
}

export { Favoritos, CrearCuenta, Login, Resultados, DetallePelicula, DetalleSerie, NoEncontrada };
