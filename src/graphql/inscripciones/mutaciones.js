import { gql } from '@apollo/client';

const CREAR_INSCRIPCION = gql`
  mutation Mutation($proyecto: String!, $estudiante: String!) {
    crearInscripcion(proyecto: $proyecto, estudiante: $estudiante) {
      _id
    }
  }
`;

const APROBAR_INSCRIPCION = gql`
  mutation AprobarInscripcion($aprobarInscripcionId: String!) {
    aprobarInscripcion(id: $aprobarInscripcionId) {
      _id
    }
  }
`;

export { CREAR_INSCRIPCION, APROBAR_INSCRIPCION };
