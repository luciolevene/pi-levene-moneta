import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './Header.css';

const cookies = new Cookies();

function Header(props) {

  function cerrarSesion() {
    cookies.remove('user-auth-cookie');
    props.history.push('/login');
  }

  let usuarioEnSesion = cookies.get('user-auth-cookie');

    return (
      <div>
        <h1>UdeSA Movies</h1>
        <nav>
          <ul className="nav nav-tabs my-4">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/peliculas">Películas</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/series">Series</Link></li>
            {usuarioEnSesion ?
              <React.Fragment>
                <li className="nav-item"><Link className="nav-link" to="/favoritos">Favoritos</Link></li>
                <li className="nav-item ml-auto"><button className="nav-link btn" onClick={() => cerrarSesion()}>Cerrar sesión</button></li>
              </React.Fragment> :
              <React.Fragment>
                <li className="nav-item ml-auto"><Link className="nav-link" to="/crear-cuenta">Crear cuenta</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
              </React.Fragment>
            }
          </ul>
        </nav>
      </div>
    );
  }


export default withRouter(Header);
