import React, { useEffect, useCallback } from 'react';
import Sidebar from 'components/Sidebar';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { useAuth } from 'context/authContext';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { VALIDATE_TOKEN } from 'graphql/auth/mutation';
import 'react-toastify/dist/ReactToastify.css';

const PrivateLayout = () => {
  const { authToken, setToken, loadingAuth } = useAuth();
  let navigate = useNavigate();
  const [validateToken, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =
    useMutation(VALIDATE_TOKEN);

  useEffect(() => {
    console.log('dm', dataMutation);
    if (dataMutation) {
      if (dataMutation.validateToken.authorized) {
        setToken(dataMutation.validateToken.token);
      } else {
        setToken(null);
      }
    }
  }, [dataMutation, setToken]);

  const refresh = useCallback(
    async (token) => {
      // await refreshToken(prevToken).then((res) => {
      //   setTokens(res['token']);
      //   setLoadingLogin(false);
      // });
      console.log('refresh', token);
      validateToken();
    },
    [validateToken]
  );

  useEffect(() => {
    if (dataMutation) {
      console.log('dm', dataMutation);
    }
  }, [dataMutation]);

  useEffect(() => {
    // setLoadingAuth(true);
    let prevToken;
    try {
      prevToken = JSON.parse(localStorage.getItem('token'));
    } catch (e) {
      prevToken = null;
    }
    if (prevToken) {
      refresh(prevToken);
    } else {
      setToken(null);
    }
  }, [refresh, setToken]);

  useEffect(() => {
    console.log('tkn', authToken, loadingAuth);
    if (!loadingAuth && !authToken) {
      navigate('/auth/login');
    }
  }, [loadingAuth, authToken, navigate]);

  if (loadingMutation || loadingAuth) return <div>Loading....</div>;

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
