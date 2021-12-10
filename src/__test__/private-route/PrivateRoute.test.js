import React from 'react';
import PrivateRoute from 'components/PrivateRoute';
import { UserContext } from 'context/userContext';
import { render, cleanup, screen } from '@testing-library/react';

afterEach(cleanup);

it('renders the page when roles match', () => {
  render(
    <UserContext.Provider value={{ userData: { rol: 'ADMINISTRADOR' } }}>
      <PrivateRoute roleList={['ADMINISTRADOR']}>
        <div data-testid='authorized'>Page</div>
      </PrivateRoute>
    </UserContext.Provider>
  );

  expect(screen.getByTestId('authorized')).toHaveTextContent('Page');
});

it('renders unauthorized when roles dont match', () => {
  render(
    <UserContext.Provider value={{ userData: { rol: 'LIDER' } }}>
      <PrivateRoute roleList={['ADMINISTRADOR']}>
        <div>Page</div>
      </PrivateRoute>
    </UserContext.Provider>
  );

  expect(screen.getByTestId('unauthorized')).toHaveTextContent(
    'No estás autorizado para ver este sitio.'
  );
});
