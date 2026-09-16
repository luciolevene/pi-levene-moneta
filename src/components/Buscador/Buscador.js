import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Buscador.css';

class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busqueda: '',
      tipo: 'pelicula',
      error: ''
    };
  }

  controlarBusqueda(event) {
    this.setState({ busqueda: event.target.value });
  }

  controlarTipo(event) {
    this.setState({ tipo: event.target.value });
  }

  enviarBusqueda(event) {
    event.preventDefault();

    if (this.state.busqueda === '') {
      this.setState({ error: 'Ingresá una película o serie para buscar.' });
    } else {
      this.setState({ error: '' });
      this.props.history.push('/resultados/' + this.state.tipo + '/' + this.state.busqueda);
    }
  }

  render() {
    return (
      <section className="buscador">
        <h2>Buscar contenido</h2>
        <form className="formulario-busqueda" onSubmit={(event) => this.enviarBusqueda(event)}>
          <label htmlFor="busqueda">¿Qué querés buscar?</label>
          <input
            id="busqueda"
            type="text"
            value={this.state.busqueda}
            onChange={(event) => this.controlarBusqueda(event)}
            placeholder="Ej.: Batman"
          />
          <label htmlFor="tipo">Buscar en</label>
          <select id="tipo" value={this.state.tipo} onChange={(event) => this.controlarTipo(event)}>
            <option value="pelicula">Películas</option>
            <option value="serie">Series</option>
          </select>
          <button type="submit">Buscar</button>
        </form>
        {this.state.error !== '' ? <p className="mensaje-error">{this.state.error}</p> : null}
      </section>
    );
  }
}

export default withRouter(Buscador);
