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
      <React.Fragment>
        <form className="search-form" onSubmit={(event) => this.enviarBusqueda(event)}>
          <input type="text" name="searchData" placeholder="Buscar..." value={this.state.busqueda} onChange={(event) => this.controlarBusqueda(event)} />
          <select value={this.state.tipo} onChange={(event) => this.controlarTipo(event)}>
            <option value="pelicula">Películas</option>
            <option value="serie">Series</option>
          </select>
          <button type="submit" className="btn btn-success btn-sm">Buscar</button>
        </form>
        {this.state.error !== '' ? <p className="alert alert-warning">{this.state.error}</p> : ''}
      </React.Fragment>
    );
  }
}

export default withRouter(Buscador);
