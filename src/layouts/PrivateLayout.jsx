import Sidebar from 'components/Sidebar';
import { Outlet } from 'react-router';
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { useAuth } from 'context/authContext';
import { VALIDATE_TOKEN } from 'graphql/auth/mutations';
import 'react-toastify/dist/ReactToastify.css';

const PrivateLayout = () => {
  const { authToken, setToken, loadingAuth } = useAuth();

  const [validateToken, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =
    useMutation(VALIDATE_TOKEN);

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <div className='flex flex-col md:flex-row flex-no-wrap h-screen'>
      <Sidebar />
      <div className='flex w-full h-full'>
        <div className='w-full h-full  overflow-y-scroll'>
          <Outlet />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PrivateLayout;
