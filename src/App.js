import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './screens/Home/Home';
import CrearCuenta from './screens/CrearCuenta/CrearCuenta';
import Login from './screens/Login/Login';
import Peliculas from './screens/Peliculas/Peliculas';
import Series from './screens/Series/Series';
import DetallePelicula from './screens/DetallePelicula/DetallePelicula';
import DetalleSerie from './screens/DetalleSerie/DetalleSerie';
import Favoritos from './screens/Favoritos/Favoritos';
import ResultadosBusqueda from './screens/ResultadosBusqueda/ResultadosBusqueda';
import NotFound from './screens/NotFound/NotFound';

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <Header />
        <main>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route path="/crear-cuenta" component={CrearCuenta} />
            <Route path="/login" component={Login} />
            <Route path="/peliculas" component={Peliculas} />
            <Route path="/series" component={Series} />
            <Route path="/pelicula/:id" component={DetallePelicula} />
            <Route path="/serie/:id" component={DetalleSerie} />
            <Route path="/favoritos" component={Favoritos} />
            <Route path="/resultados/:tipo/:busqueda" component={ResultadosBusqueda} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;