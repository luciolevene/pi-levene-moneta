import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class FormLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }

  controlarEmail(event) {
    this.setState({ email: event.target.value });
  }

  controlarPassword(event) {
    this.setState({ password: event.target.value });
  }

  submit(event) {
    event.preventDefault();

    let usersStorage = localStorage.getItem('users');

    if (usersStorage === null) {
      this.setState({ error: 'Credenciales incorrectas' });
      return;
    }

    let usersParseado = JSON.parse(usersStorage);
    let emailIngresado = this.state.email;
    let usersFiltrado = usersParseado.filter(function(user) {
      return user.email === emailIngresado;
    });

    if (usersFiltrado.length === 0) {
      this.setState({ error: 'Credenciales incorrectas' });
      return;
    }

    if (usersFiltrado[0].password !== this.state.password) {
      this.setState({ error: 'Credenciales incorrectas' });
      return;
    }

    cookies.set('user-auth-cookie', usersFiltrado[0].email);
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={(event) => this.submit(event)}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" placeholder="Ingresá tu email" value={this.state.email} onChange={(event) => this.controlarEmail(event)} />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input type="password" className="form-control" placeholder="Ingresá tu contraseña" value={this.state.password} onChange={(event) => this.controlarPassword(event)} />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Iniciar sesión</button>
          </form>
          {this.state.error !== '' ? <p className="alert alert-warning">{this.state.error}</p> : ''}
          <p className="mt-3 text-center">¿No tenés cuenta? <Link to="/crear-cuenta">Registrarse</Link></p>
        </div>
      </div>
    );
  }
}

export default withRouter(FormLogin);