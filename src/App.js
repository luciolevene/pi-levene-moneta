import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './screens/Home/Home';
import { Favoritos, CrearCuenta, Login, Resultados, DetallePelicula, DetalleSerie, NoEncontrada } from './screens/PantallasProvisorias';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <div className="contenedor-principal">
        <Header />
        <main>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route path="/favoritos" component={Favoritos} />
            <Route path="/crear-cuenta" component={CrearCuenta} />
            <Route path="/login" component={Login} />
            <Route path="/resultados/:tipo/:busqueda" component={Resultados} />
            <Route path="/pelicula/:id" component={DetallePelicula} />
            <Route path="/serie/:id" component={DetalleSerie} />
            <Route path="/:tipo(peliculas|series)" component={Home} />
            <Route component={NoEncontrada} />
          </Switch>
        </main>
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default App;
