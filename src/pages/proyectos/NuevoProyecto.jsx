import React, { useEffect, useState } from 'react';
import Input from 'components/Input';
import { Link } from 'react-router-dom';
import DropDown from 'components/Dropdown';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USUARIOS } from 'graphql/usuarios/queries';
import PrivateRoute from 'components/PrivateRoute';
import ButtonLoading from 'components/ButtonLoading';
import { nanoid } from 'nanoid';
import { Enum_TipoObjetivo } from 'utils/enums';
import { CreateObjectiveContext } from 'context/createObjectiveContext';
import { useCreateObjective } from 'context/createObjectiveContext';
import useFormData from 'hooks/useFormData';
import { CREAR_PROYECTO } from 'graphql/proyectos/mutations';

const NuevoProyecto = () => {
  const { form, formData, updateFormData } = useFormData();
  const [mapUsuarios, setMapUsuarios] = useState([]);
  const { data, loading, error } = useQuery(GET_USUARIOS, {
    variables: {
      filtro: { rol: 'ADMINISTRADOR' },
    },
  });

  const [crearProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(CREAR_PROYECTO);

  useEffect(() => {
    if (data) {
      console.log(data);
      const dt = {};
      data.Usuarios.forEach((el) => {
        dt[el._id] = el.correo;
      });
      setMapUsuarios(dt);
    }
  }, [data]);

  const submitForm = (e) => {
    e.preventDefault();
    console.log(formData);

    formData.objetivos = Object.values(formData.objetivos);
    formData.presupuesto = parseFloat(formData.presupuesto);
    crearProyecto({
      variables: formData,
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <PrivateRoute roleList={['ADMINISTRADOR', 'LIDER']}>
      <div className='p-10'>
        <Link to='/proyectos'>
          <i className='fas fa-arrow-left' />
        </Link>
        <div className='flex w-full items-center justify-center'>
          <h1 className='text-xl font-bold text-gray-900'>Creación de un nuevo Proyecto</h1>
        </div>
        <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
          <Input label='Nombre del Proyecto' name='nombre' type='text' required={true} />
          <Input label='Presupuesto' name='presupuesto' type='number' required={true} />
          <Input label='Fecha de Inicio' name='fechaInicio' type='date' required={true} />
          <Input label='Fecha de Fin' name='fechaFin' type='date' required={true} />
          <DropDown label='Líder' name='lider' required={true} options={mapUsuarios} />
          <Objetivos />
          <ButtonLoading loading={false} text='Crear Proyecto' />
        </form>
      </div>
    </PrivateRoute>
  );
};

const Objetivos = () => {
  const [listaObjetivos, setListaObjetivos] = useState([]);

  const removeObjetivo = (obj) => {
    setListaObjetivos(listaObjetivos.filter((el) => el.props.id !== obj));
  };

  const addObjetivo = () => {
    const id = nanoid();
    return <Objetivo key={id} id={id} />;
  };

  return (
    <CreateObjectiveContext.Provider value={{ removeObjetivo }}>
      <div>
        <span>Objetivos del Proyecto:</span>
        <i
          className='fas fa-plus rounded-full bg-green-500 hover:bg-green-400 text-white p-2 mx-2 cursor-pointer'
          onClick={() => {
            setListaObjetivos([...listaObjetivos, addObjetivo()]);
          }}
        />
        {listaObjetivos.map((El) => {
          return El;
        })}
      </div>
    </CreateObjectiveContext.Provider>
  );
};

const Objetivo = ({ id }) => {
  const { removeObjetivo } = useCreateObjective();
  return (
    <div className='flex items-center'>
      <Input
        name={`nested||objetivos||${id}||descripcion`}
        label='Descripción'
        type='text'
        required={true}
      />
      <div className='mx-2'>
        <DropDown
          label='Tipo de Objetivo'
          name={`nested||objetivos||${id}||tipo`}
          required={true}
          options={Enum_TipoObjetivo}
        />
      </div>

      <i
        className='fas fa-minus mt-6 bg-red-500 text-white p-2 rounded-full cursor-pointer hover:bg-red-400'
        onClick={() => removeObjetivo(id)}
      />
    </div>
  );
};

export default NuevoProyecto;
