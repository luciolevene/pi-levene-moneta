import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Inicio, Peliculas, Series, Favoritos, CrearCuenta, Login, NoEncontrada } from './screens/PantallasProvisorias';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <div className="contenedor-principal">
        <Header />
        <main>
          <Switch>
            <Route exact={true} path="/" component={Inicio} />
            <Route path="/peliculas" component={Peliculas} />
            <Route path="/series" component={Series} />
            <Route path="/favoritos" component={Favoritos} />
            <Route path="/crear-cuenta" component={CrearCuenta} />
            <Route path="/login" component={Login} />
            <Route component={NoEncontrada} />
          </Switch>
        </main>
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default App;
