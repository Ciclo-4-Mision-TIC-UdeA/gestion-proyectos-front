import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { PROYECTOS } from 'graphql/proyectos/queries';
import DropDown from 'components/Dropdown';
import Input from 'components/Input';
import { Dialog } from '@mui/material';
import { Enum_EstadoProyecto, Enum_TipoObjetivo } from 'utils/enums';
import ButtonLoading from 'components/ButtonLoading';
import {
  EDITAR_PROYECTO,
  ELIMINAR_OBJETIVO,
  EDITAR_OBJETIVO,
} from 'graphql/proyectos/mutations';
import useFormData from 'hooks/useFormData';
import PrivateComponent from 'components/PrivateComponent';
import { Link } from 'react-router-dom';
import { CREAR_INSCRIPCION } from 'graphql/inscripciones/mutaciones';
import { useUser } from 'context/userContext';
import { toast } from 'react-toastify';
import {
  AccordionStyled,
  AccordionSummaryStyled,
  AccordionDetailsStyled,
} from 'components/Accordion';

import ReactLoading from 'react-loading';

const IndexProyectos = () => {
  const { data: queryData, loading } = useQuery(PROYECTOS);

  if (loading) return <div>Cargando...</div>;

  if (queryData.Proyectos) {
    return (
      <div className='p-10 flex flex-col'>
        <div className='flex w-full items-center justify-center'>
          <h1 className='text-2xl font-bold text-gray-900'>
            Lista de Proyectos
          </h1>
        </div>
        <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>
          <div className='my-2 self-end'>
            <button
              type='button'
              className='bg-indigo-500 text-gray-50 p-2 rounded-lg shadow-lg hover:bg-indigo-400'
            >
              <Link to='/proyectos/nuevo'>Crear nuevo proyecto</Link>
            </button>
          </div>
        </PrivateComponent>
        {queryData.Proyectos.map((proyecto) => (
          <AccordionProyecto proyecto={proyecto} />
        ))}
      </div>
    );
  }

  return <></>;
};

const AccordionProyecto = ({ proyecto }) => {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <>
      <AccordionStyled>
        <AccordionSummaryStyled
          expandIcon={<i className='fas fa-chevron-down' />}
        >
          <div className='flex w-full justify-between'>
            <div className='uppercase font-bold text-gray-100 '>
              {proyecto.nombre} - {proyecto.estado}
            </div>
          </div>
        </AccordionSummaryStyled>
        <AccordionDetailsStyled>
          <PrivateComponent roleList={['ADMINISTRADOR']}>
            <button
              type='button'
              onClick={() => {
                setShowDialog(true);
              }}
            >
              <i className='mx-4 fas fa-pen text-yellow-600 hover:text-yellow-400' />
            </button>
          </PrivateComponent>
          <PrivateComponent roleList={['LIDER', 'ESTUDIANTE']}>
            <InscripcionProyecto
              idProyecto={proyecto._id}
              estado={proyecto.estado}
              inscripciones={proyecto.inscripciones}
            />
          </PrivateComponent>
          <div>Liderado Por: {proyecto.lider.correo}</div>
          <div className='flex'>
            {proyecto.objetivos.map((objetivo, index) => (
              <Objetivo
                index={index}
                _id={objetivo._id}
                idProyecto={proyecto._id}
                tipo={objetivo.tipo}
                descripcion={objetivo.descripcion}
              />
            ))}
          </div>
        </AccordionDetailsStyled>
      </AccordionStyled>
      <Dialog
        open={showDialog}
        onClose={() => {
          setShowDialog(false);
        }}
      >
        <FormEditProyecto _id={proyecto._id} />
      </Dialog>
    </>
  );
};

const FormEditProyecto = ({ _id }) => {
  const { form, formData, updateFormData } = useFormData();

  // falta capturar error de la mutacion
  // falta toast de success
  const [editarProyecto, { loading }] = useMutation(EDITAR_PROYECTO);

  const submitForm = (e) => {
    e.preventDefault();
    editarProyecto({
      variables: {
        _id,
        campos: formData,
      },
    });
  };

  return (
    <div className='p-4'>
      <h1 className='font-bold'>Modificar Estado del Proyecto</h1>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className='flex flex-col items-center'
      >
        <DropDown
          label='Estado del Proyecto'
          name='estado'
          options={Enum_EstadoProyecto}
        />
        <ButtonLoading disabled={false} loading={loading} text='Confirmar' />
      </form>
    </div>
  );
};

const Objetivo = ({ index, _id, idProyecto, tipo, descripcion }) => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [
    eliminarObjetivo,
    { data: dataMutationEliminar, loading: eliminarLoading },
  ] = useMutation(ELIMINAR_OBJETIVO, {
    refetchQueries: [{ query: PROYECTOS }],
  });

  useEffect(() => {
    if (dataMutationEliminar) {
      toast.success('objetivo eliminado satisfactoriamente');
    }
  }, [dataMutationEliminar]);

  const ejecutarEliminacion = () => {
    eliminarObjetivo({ variables: { idProyecto, idObjetivo: _id } });
  };

  if (eliminarLoading)
    return (
      <ReactLoading
        data-testid='loading-in-button'
        type='spin'
        height={100}
        width={100}
      />
    );
  return (
    <div className='mx-5 my-4 bg-gray-50 p-8 rounded-lg flex flex-col items-center justify-center shadow-xl'>
      <div className='text-lg font-bold'>{tipo}</div>
      <div>{descripcion}</div>
      <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>
        <div className='flex my-2'>
          <button type='button' onClick={() => setShowEditDialog(true)}>
            <i className='fas fa-pen mx-2 text-yellow-500 hover:text-yellow-200 cursor-pointer' />
          </button>
          <button type='button' onClick={ejecutarEliminacion}>
            <i className='fas fa-trash mx-2 text-red-500 hover:text-red-200 cursor-pointer' />
          </button>
        </div>
        <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)}>
          <EditarObjetivo
            descripcion={descripcion}
            tipo={tipo}
            index={index}
            idProyecto={idProyecto}
            setShowEditDialog={setShowEditDialog}
          />
        </Dialog>
      </PrivateComponent>
    </div>
  );
};

const EditarObjetivo = ({
  descripcion,
  tipo,
  index,
  idProyecto,
  setShowEditDialog,
}) => {
  const { form, formData, updateFormData } = useFormData();

  const [editarObjetivo, { data: dataMutation, loading }] = useMutation(
    EDITAR_OBJETIVO,
    {
      refetchQueries: [{ query: PROYECTOS }],
    }
  );

  useEffect(() => {
    if (dataMutation) {
      toast.success('Objetivo editado con exito');
      setShowEditDialog(false);
    }
  }, [dataMutation, setShowEditDialog]);

  const submitForm = (e) => {
    e.preventDefault();
    editarObjetivo({
      variables: {
        idProyecto,
        indexObjetivo: index,
        campos: formData,
      },
    }).catch((error) => {
      toast.error('Error editando el objetivo', error);
    });
  };
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold text-gray-900'>Editar Objetivo</h1>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <DropDown
          label='Tipo de Objetivo'
          name='tipo'
          required
          options={Enum_TipoObjetivo}
          defaultValue={tipo}
        />
        <Input
          label='Descripcion del objetivo'
          name='descripcion'
          required
          defaultValue={descripcion}
        />
        <ButtonLoading
          text='Confirmar'
          disabled={Object.keys(formData).length === 0}
          loading={loading}
        />
      </form>
    </div>
  );
};

const InscripcionProyecto = ({ idProyecto, estado, inscripciones }) => {
  const [estadoInscripcion, setEstadoInscripcion] = useState('');

  // falta captura del error de la mutacion
  const [crearInscripcion, { data, loading }] = useMutation(CREAR_INSCRIPCION);
  const { userData } = useUser();

  useEffect(() => {
    if (userData && inscripciones) {
      const flt = inscripciones.filter(
        (el) => el.estudiante._id === userData._id
      );
      if (flt.length > 0) {
        setEstadoInscripcion(flt[0].estado);
      }
    }
  }, [userData, inscripciones]);

  useEffect(() => {
    if (data) {
      toast.success('inscripcion creada con exito');
    }
  }, [data]);

  const confirmarInscripcion = () => {
    crearInscripcion({
      variables: { proyecto: idProyecto, estudiante: userData._id },
    });
  };

  return (
    <>
      {estadoInscripcion !== '' ? (
        <div className='flex flex-col items-start'>
          <span>
            Ya estas inscrito en este proyecto y el estado es{' '}
            {estadoInscripcion}
          </span>
          {estadoInscripcion === 'ACEPTADO' && (
            <Link
              to={`/avances/${idProyecto}`}
              className='bg-yellow-700 p-2 rounded-lg text-white my-2 hover:bg-yellow-500'
            >
              Visualizar Avances
            </Link>
          )}
        </div>
      ) : (
        <ButtonLoading
          onClick={() => confirmarInscripcion()}
          disabled={estado === 'INACTIVO'}
          loading={loading}
          text='Inscribirme en este proyecto'
        />
      )}
    </>
  );
};

export default IndexProyectos;
