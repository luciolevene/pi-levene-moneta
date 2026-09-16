import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './Header.css';

const cookies = new Cookies();

function Header() {
  let usuarioEnSesion = cookies.get('user-auth-cookie');

  return (
    <header>
      <h1><Link to="/">UdeSA Movies</Link></h1>
      <nav>
        <ul className="menu-navegacion">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/peliculas">Películas</Link></li>
          <li><Link to="/series">Series</Link></li>
          {usuarioEnSesion ? <li><Link to="/favoritos">Favoritos</Link></li> : null}
          {!usuarioEnSesion ? <li className="item-derecha"><Link to="/crear-cuenta">Crear cuenta</Link></li> : null}
          {!usuarioEnSesion ? <li><Link to="/login">Login</Link></li> : null}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
