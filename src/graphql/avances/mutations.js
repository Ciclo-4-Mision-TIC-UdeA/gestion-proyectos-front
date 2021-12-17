import { gql } from '@apollo/client';

const CREAR_AVANCE = gql`
  mutation Mutation(
    $fecha: Date!
    $descripcion: String!
    $proyecto: String!
    $creadoPor: String!
  ) {
    crearAvance(
      fecha: $fecha
      descripcion: $descripcion
      proyecto: $proyecto
      creadoPor: $creadoPor
    ) {
      _id
    }
  }
`;

const CREAR_OBSERVACION = gql`
  mutation Mutation($_id: String!, $observacion: String!) {
    crearObservacion(_id: $_id, observacion: $observacion) {
      _id
      observaciones
    }
  }
`;

export { CREAR_AVANCE, CREAR_OBSERVACION };
