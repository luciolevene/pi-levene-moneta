import React from 'react';
import { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

function FormRegister(props) {
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

    let usuarioACrear = {
      email: email,
      password: password
    };

    if (password.length < 6) {
      setError('La contraseña debe tener un mínimo de 6 caracteres');
      return;
    }

    let usersStorage = localStorage.getItem('users');

    if (usersStorage !== null) {
      let usersParseado = JSON.parse(usersStorage);
      let emailIngresado = email;
      let usersFiltrado = usersParseado.filter(function(user) {
        return user.email === emailIngresado;
      });

      if (usersFiltrado.length > 0) {
        setError('Ya existe un usuario con el email ingresado');
        return;
      }

      usersParseado.push(usuarioACrear);
      let usersEnJson = JSON.stringify(usersParseado);
      localStorage.setItem('users', usersEnJson);
    } else {
      let usersInicial = [usuarioACrear];
      let usersEnJson = JSON.stringify(usersInicial);
      localStorage.setItem('users', usersEnJson);
    }

    setError('');
    props.history.push('/login');
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
            <button type="submit" className="btn btn-primary btn-block">Registrarse</button>
          </form>
          {error !== '' ? <p className="alert alert-warning">{error}</p> : ''}
          <p className="mt-3 text-center">¿Ya tenés cuenta? <Link to="/login">Iniciar sesión</Link></p>
        </div>
      </div>
    );
}

export default withRouter(FormRegister);