import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class FormRegister extends Component {
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

    let usuarioACrear = {
      email: this.state.email,
      password: this.state.password
    };

    if (this.state.password.length < 6) {
      this.setState({ error: 'La contraseña debe tener un mínimo de 6 caracteres' });
      return;
    }

    let usersStorage = localStorage.getItem('users');

    if (usersStorage !== null) {
      let usersParseado = JSON.parse(usersStorage);
      let emailIngresado = this.state.email;
      let usersFiltrado = usersParseado.filter(function(user) {
        return user.email === emailIngresado;
      });

      if (usersFiltrado.length > 0) {
        this.setState({ error: 'Ya existe un usuario con el email ingresado' });
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

    this.setState({ error: '' });
    this.props.history.push('/login');
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
            <button type="submit" className="btn btn-primary btn-block">Registrarse</button>
          </form>
          {this.state.error !== '' ? <p className="alert alert-warning">{this.state.error}</p> : ''}
          <p className="mt-3 text-center">¿Ya tenés cuenta? <Link to="/login">Iniciar sesión</Link></p>
        </div>
      </div>
    );
  }
}

export default withRouter(FormRegister);