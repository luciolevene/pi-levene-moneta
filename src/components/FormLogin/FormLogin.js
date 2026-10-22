import React from 'react';
import { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function FormLogin(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  

  function controlarEmail(event) {
    setEmail(event.target.value);
  }

  function controlarPassword(event) {
    setPassword(event.target.value);
  }

  function submit(event) {
    event.preventDefault();

    let usersStorage = localStorage.getItem('users');

    if (usersStorage === null) {
      setError('Credenciales incorrectas');
      return;
    }

    let usersParseado = JSON.parse(usersStorage);
    let emailIngresado = email;
    let usersFiltrado = usersParseado.filter(function(user) {
      return user.email === emailIngresado;
    });

    if (usersFiltrado.length === 0) {
      setError('Credenciales incorrectas');
      return;
    }

    if (usersFiltrado[0].password !== password) {
      setError('Credenciales incorrectas');
      return;
    }

    cookies.set('user-auth-cookie', usersFiltrado[0].email);
    props.history.push('/');
    
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <form onSubmit={(event) => submit(event)}>
          <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" placeholder="Ingresá tu email" value={email} onChange={(event) => controlarEmail(event)} />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input type="password" className="form-control" placeholder="Ingresá tu contraseña" value={password} onChange={(event) => controlarPassword(event)} />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Iniciar sesión</button>
          </form>
          {error !== '' ? <p className="alert alert-warning">{error}</p> : ''}
          <p className="mt-3 text-center">¿No tenés cuenta? <Link to="/crear-cuenta">Registrarse</Link></p>
        </div>
      </div>
    );
  }

export default withRouter(FormLogin);