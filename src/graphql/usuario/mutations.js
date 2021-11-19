import { gql } from '@apollo/client';

const EDITAR_USUARIO = gql`
  mutation EditarUsuario(
    $_id: String!
    $nombre: String!
    $apellido: String!
    $identificacion: String!
    $correo: String!
    $rol: Enum_Rol!
  ) {
    editarUsuario(
      _id: $_id
      nombre: $nombre
      apellido: $apellido
      identificacion: $identificacion
      correo: $correo
      rol: $rol
    ) {
      _id
      nombre
      apellido
      correo
      identificacion
      rol
    }
  }
`;

export { EDITAR_USUARIO };
