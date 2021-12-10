import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthContext } from 'context/authContext';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router, Routes, Route } from 'react-router-dom';
import Login from '../../pages/auth/login';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:3050/api/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = JSON.parse(localStorage.getItem('token'));
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

test('testing login route', () => {
  const history = createMemoryHistory();
  const route = '/auth/login';
  history.push(route);
  render(
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ setToken: null }}>
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route path='/auth/login' element={<Login />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </ApolloProvider>
  );

  expect(screen.getByTestId('login-page')).toBeInTheDocument();
});
