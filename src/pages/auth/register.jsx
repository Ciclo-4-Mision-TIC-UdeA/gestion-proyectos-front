import React, { useEffect } from 'react';
import Input from 'components/Input';
import { Enum_Rol } from 'utils/enums';
import DropDown from 'components/DropDown';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { CREAR_USUARIO } from 'graphql/auth/mutation';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useAuth } from 'context/authContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { form, formData, updateFormData } = useFormData(null);
  const { setToken } = useAuth();
  let navigate = useNavigate();

  const [crearUser, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =
    useMutation(CREAR_USUARIO);

  const submitForm = (e) => {
    e.preventDefault();
    crearUser({ variables: formData });
  };

  useEffect(() => {
    if (dataMutation) {
      if (dataMutation.registro.error) {
        console.error('MOSTRAR MENSAJE DE ERROR AQUI');
      }
      setToken(dataMutation.registro.token);
      navigate('/');
    }
  }, [dataMutation, setToken, navigate]);

  return (
    <div className='flex flex-col h-full w-full items-center justify-center'>
      <h1 className='text-3xl font-bold my-4'>Regístrate</h1>
      <form className='flex flex-col' onSubmit={submitForm} onChange={updateFormData} ref={form}>
        <div className='grid grid-cols-2 gap-5'>
          <Input label='Nombre:' name='nombre' type='text' required />
          <Input label='Apellido:' name='apellido' type='text' required />
          <Input label='Documento:' name='identificacion' type='text' required />
          <DropDown label='Rol deseado:' name='rol' required={true} options={Enum_Rol} />
          <Input label='Correo:' name='correo' type='email' required />
          <Input label='Contraseña:' name='password' type='password' required />
        </div>
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={loadingMutation}
          text='Registrarme'
        />
      </form>
      <span>¿Ya tienes una cuenta?</span>
      <Link to='/auth/login'>
        <span className='text-blue-700'>Inicia sesión</span>
      </Link>
    </div>
  );
};

export default Register;
