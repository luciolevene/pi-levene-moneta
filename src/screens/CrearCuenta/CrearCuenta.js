import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class FormRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }

  submit(event) {
    event.preventDefault();

    const usuarioACrear = {
      email: this.state.email,
      password: this.state.password,
    };

    if (this.state.password.length < 6) {
      this.setState({
        error: 'La contraseña debe tener un mínimo de 6 caracteres',
      });
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
        this.setState({
          error: 'Ya existe un usuario con el email ingresado',
        });
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
      <form onSubmit={(event) => this.submit(event)}>
        <label>Email:</label>
        <input
          type="email"
          value={this.state.email}
          onChange={(event) => this.setState({ email: event.target.value })}
        />

        <label>Contraseña:</label>
        <input
          type="password"
          value={this.state.password}
          onChange={(event) => this.setState({ password: event.target.value })}
        />

        <input type="submit" value="Registrarse" />
        {this.state.error === '' ?
          <p></p> :
          <p>{this.state.error}</p>
        }
      </form>
    );
  }
}

export default withRouter(FormRegister);
