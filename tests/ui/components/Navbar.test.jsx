import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../src/auth/context/AuthContext';
import { Navbar } from '../../../src/ui/components/Navbar';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en <Navbar />', () => {
  const contextValue = {
    logged: true,
    user: {
      id: '123ABC',
      name: 'Jennyfer Salcedo',
    },
    logout: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  test('debe de mostrar el nombre del usuario logueado', () => {
    const { user } = contextValue;

    render(
      <MemoryRouter>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(user.name)).toBeTruthy();
  });

  test('debe de llamar el logout y navigate cuando se hace clic en el botón', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    const logoutButton = screen.getByRole('button');
    fireEvent.click(logoutButton);
    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith('/login', { replace: true });
  });
});
