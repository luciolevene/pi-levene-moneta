import React, { Component } from 'react';
import FormLogin from '../../components/FormLogin/FormLogin';

class Login extends Component {
  render() {
    return (
      <section>
        <h2 className="alert alert-primary">Iniciar sesión</h2>
        <FormLogin />
      </section>
    );
  }
}

export default Login;