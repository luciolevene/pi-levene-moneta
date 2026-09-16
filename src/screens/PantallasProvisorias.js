import React from 'react';

function PantallaProvisoria(props) {
  return (
    <section className="pantalla-provisoria">
      <h2>{props.titulo}</h2>
      <p>{props.texto}</p>
    </section>
  );
}

function Inicio() {
  return <PantallaProvisoria titulo="Inicio" texto="Próximamente vas a encontrar películas y series populares." />;
}

function Peliculas() {
  return <PantallaProvisoria titulo="Ver todas las películas" texto="Esta sección mostrará más películas y permitirá filtrarlas." />;
}

function Series() {
  return <PantallaProvisoria titulo="Ver todas las series" texto="Esta sección mostrará más series y permitirá filtrarlas." />;
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

function NoEncontrada() {
  return <PantallaProvisoria titulo="404" texto="La página que buscás no existe." />;
}

export { Inicio, Peliculas, Series, Favoritos, CrearCuenta, Login, NoEncontrada };
