import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({ results: [] })
  }));
});

test('muestra el nombre de la aplicación', async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  expect(screen.getByText(/udesa movies/i)).toBeInTheDocument();
  expect(screen.getByText(/login/i)).toBeInTheDocument();
  expect(screen.queryByText(/favoritos/i)).not.toBeInTheDocument();
  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
});

test('muestra favoritos cuando existe la cookie de sesión', async () => {
  document.cookie = 'user-auth-cookie=lucio%40example.com; path=/';

  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  expect(screen.getByText(/favoritos/i)).toBeInTheDocument();
  expect(screen.queryByText(/login/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/crear cuenta/i)).not.toBeInTheDocument();

  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

  document.cookie = 'user-auth-cookie=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
});

test('muestra cuatro películas y cuatro series en Home', async () => {
  let peliculas = [1, 2, 3, 4, 5].map((id) => ({
    id: id,
    title: 'Película ' + id,
    overview: 'Descripción de película ' + id,
    poster_path: '/pelicula.jpg'
  }));
  let series = [1, 2, 3, 4, 5].map((id) => ({
    id: id + 10,
    name: 'Serie ' + id,
    overview: 'Descripción de serie ' + id,
    poster_path: '/serie.jpg'
  }));

  global.fetch
    .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve({ results: peliculas }) }))
    .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve({ results: series }) }));

  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  await waitFor(() => expect(screen.getAllByRole('article')).toHaveLength(8));
  expect(screen.getByText('Película 1')).toBeInTheDocument();
  expect(screen.getByText('Serie 1')).toBeInTheDocument();
  expect(screen.getAllByText('Ver descripción')).toHaveLength(8);
});
