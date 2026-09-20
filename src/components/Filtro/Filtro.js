import React, { Component } from 'react';
import './Filtro.css';

class Filtro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textoAFiltrar: ''
    };
  }

  evitarSubmit(event) {
    event.preventDefault();
  }

  controlarCambios(event) {
    this.setState({
      textoAFiltrar: event.target.value
    }, () => this.props.filtrar(this.state.textoAFiltrar));
  }

  render() {
    return (
      <form className="filter-form px-0 mb-3" onSubmit={(event) => this.evitarSubmit(event)}>
        <input type="text" name="filter" placeholder="Buscar dentro de la lista" value={this.state.textoAFiltrar} onChange={(event) => this.controlarCambios(event)} />
      </form>
    );
  }
}

export default Filtro;