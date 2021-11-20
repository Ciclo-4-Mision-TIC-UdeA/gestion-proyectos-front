import { gql } from '@apollo/client';

const CREAR_USUARIO = gql`
  mutation registro(
    $nombre: String!
    $apellido: String!
    $identificacion: String!
    $correo: String!
    $rol: Enum_Rol!
    $password: String!
  ) {
    registro(
      nombre: $nombre
      apellido: $apellido
      identificacion: $identificacion
      correo: $correo
      rol: $rol
      password: $password
    ) {
      token
      error
      authorized
    }
  }
`;

const LOGIN = gql`
  mutation Mutation($correo: String!, $password: String!) {
    login(correo: $correo, password: $password) {
      token
      error
      authorized
    }
  }
`;

const VALIDATE_TOKEN = gql`
  mutation Mutation {
    validateToken {
      token
      error
      authorized
    }
  }
`;

export { CREAR_USUARIO, LOGIN, VALIDATE_TOKEN };
