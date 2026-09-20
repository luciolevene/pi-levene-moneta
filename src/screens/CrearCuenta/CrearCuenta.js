import React, { Component } from 'react';
import FormRegister from '../../components/FormRegister/FormRegister';

class CrearCuenta extends Component {
  render() {
    return (
      <section>
        <h2 className="alert alert-primary">Registro</h2>
        <FormRegister />
      </section>
    );
  }
}

export default CrearCuenta;