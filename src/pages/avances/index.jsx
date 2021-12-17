import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_AVANCES } from 'graphql/avances/queries';
import { useParams } from 'react-router-dom';
import { Dialog } from '@mui/material';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { CREAR_AVANCE, CREAR_OBSERVACION } from 'graphql/avances/mutations';
import { useUser } from 'context/userContext';
import { toast } from 'react-toastify';
import PrivateComponent from 'components/PrivateComponent';
import { nanoid } from 'nanoid';

const IndexAvance = () => {
  const { projectid } = useParams();
  const [openDialog, setOpenDialog] = useState(false);

  // falta captura de error del loading
  const { data, loading } = useQuery(GET_AVANCES, {
    variables: {
      project: projectid,
    },
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div className='flex flex-col p-10 items-center w-full'>
      <h1 className='text-2xl font-bold text-gray-900 my-2'>
        Avances para el proyecto {projectid}
      </h1>
      <button
        onClick={() => setOpenDialog(true)}
        className='flex-end bg-indigo-500'
        type='button'
      >
        Crear nuevo avance
      </button>
      {data.Avances.length === 0 ? (
        <span>No tienes avances para este proyecto</span>
      ) : (
        data.Avances.map((avance) => <Avance avance={avance} />)
      )}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <CrearAvance proyecto={projectid} setOpenDialog={setOpenDialog} />
      </Dialog>
    </div>
  );
};

const Avance = ({ avance }) => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <div className='flex flex-col bg-gray-200 shadow-lg p-3 rounded-xl m-2'>
      <span>
        <strong>Avance:</strong> {avance.descripcion}
      </span>
      <span>
        <strong>Fecha: </strong>
        {avance.fecha}
      </span>
      {/* <span>{avance.observaciones.length === 0 ?'Sin comentarios':}</span> */}
      <div className='flex  my-4'>
        {avance.observaciones.length === 0 ? (
          <span>Sin Observaciones</span>
        ) : (
          <>
            {avance.observaciones.map((obs, index) => {
              return (
                <div
                  key={nanoid()}
                  className='bg-white w-32 m-2 p-2 rounded-lg shadow-lg flex flex-col'
                >
                  <span>
                    {index + 1}. {obs}
                  </span>
                  <div className='flex items-end justify-center my-2'>
                    <i className='fas fa-pen mx-2' />
                    <i className='fas fa-trash mx-2' />
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
      <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>
        <button
          onClick={() => {
            setOpenDialog(true);
          }}
          className='bg-indigo-500 p-2  my-2 rounded-lg w-48 text-white hover:bg-indigo-700'
          type='button'
        >
          Agregar observacion
        </button>
      </PrivateComponent>
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
      >
        <AgregarObservacion _id={avance._id} setOpenDialog={setOpenDialog} />
      </Dialog>
    </div>
  );
};

const AgregarObservacion = ({ _id, setOpenDialog }) => {
  const { formData, form, updateFormData } = useFormData();

  const [crearObservacion, { loading }] = useMutation(CREAR_OBSERVACION, {
    refetchQueries: [GET_AVANCES],
  });

  const submitForm = (e) => {
    e.preventDefault();
    crearObservacion({
      variables: {
        _id,
        ...formData,
      },
    })
      .then(() => {
        toast.success('observacion agregado exitosamente');
        setOpenDialog(false);
      })
      .catch(() => {
        toast.error('error agregando observacion');
      });
  };
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold text-gray-900'>
        Agregar una observacion
      </h1>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        {/* <Input name='observacion' type='text' required /> */}
        <div className='flex flex-col'>
          <textarea name='observacion' className='input my-2' />
          <ButtonLoading
            text='Agregar observacion'
            loading={loading}
            disabled={Object.keys(formData).length === 0}
          />
        </div>
      </form>
    </div>
  );
};

const CrearAvance = ({ proyecto, setOpenDialog }) => {
  const { userData } = useUser();
  const { form, formData, updateFormData } = useFormData();

  const [crearAvance, { loading }] = useMutation(CREAR_AVANCE, {
    refetchQueries: [GET_AVANCES],
  });

  const submitForm = (e) => {
    e.preventDefault();

    crearAvance({
      variables: { ...formData, proyecto, creadoPor: userData._id },
    })
      .then(() => {
        toast.success('avance creado con exito');
        setOpenDialog(false);
      })
      .catch(() => {
        toast.error('error creando el avance');
      });
  };
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold text-gray-900'>Crear Nuevo Avance</h1>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <Input name='descripcion' label='Descripción' type='text' />
        <Input name='fecha' label='Fecha' type='date' />
        <ButtonLoading
          text='Crear Avance'
          loading={loading}
          disabled={Object.keys(formData).length === 0}
        />
      </form>
    </div>
  );
};

export default IndexAvance;
