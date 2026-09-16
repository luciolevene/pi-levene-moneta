import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('muestra el nombre de la aplicación', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  expect(screen.getByText(/udesa movies/i)).toBeInTheDocument();
  expect(screen.getByText(/login/i)).toBeInTheDocument();
  expect(screen.queryByText(/favoritos/i)).not.toBeInTheDocument();
});

test('muestra favoritos cuando existe la cookie de sesión', () => {
  document.cookie = 'user-auth-cookie=lucio%40example.com; path=/';

  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  expect(screen.getByText(/favoritos/i)).toBeInTheDocument();
  expect(screen.queryByText(/login/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/crear cuenta/i)).not.toBeInTheDocument();

  document.cookie = 'user-auth-cookie=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
});
