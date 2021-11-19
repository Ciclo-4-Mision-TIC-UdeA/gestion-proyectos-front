import React, { useState } from 'react';
import PrivateLayout from 'layouts/PrivateLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { UserContext } from 'context/userContext';
import Index from 'pages/Index';
import Usuarios from 'pages/usuarios/index';
import IndexCategory1 from 'pages/category1/Index';
import Category1 from 'pages/category1/CategoryPage1';
import { ApolloClient, InMemoryCache, from, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';
import EditarUsuario from 'pages/usuarios/editar';
import 'styles/globals.css';
import 'styles/table.css';

// import PrivateRoute from 'components/PrivateRoute';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    new HttpLink({
      uri:
        process.env.NODE_ENV === 'production'
          ? 'https://servidor-gql-mintic.herokuapp.com/graphql'
          : 'http://localhost:4000/graphql',
    }),
  ]),
});

function App() {
  const [userData, setUserData] = useState({});

  return (
    <ApolloProvider client={client}>
      <Auth0Provider
        domain='misiontic-concesionario.us.auth0.com'
        clientId='WsdhjjQzDLIZEHA6ouuxXGxFONFGAQ4g'
        redirectUri='http://localhost:3000/admin'
        audience='api-autenticacion-concesionario-mintic'
      >
        <UserContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<PrivateLayout />}>
                <Route path='' element={<Index />} />
                <Route path='usuarios/' element={<Usuarios />} />
                <Route path='usuarios/editar/:_id' element={<EditarUsuario />} />
                <Route path='category1' element={<IndexCategory1 />} />
                <Route path='category1/page1' element={<Category1 />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </Auth0Provider>
    </ApolloProvider>
  );
}

export default App;
