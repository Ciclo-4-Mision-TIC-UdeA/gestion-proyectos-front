import Sidebar from 'components/Sidebar';
import { Outlet } from 'react-router';
import React from 'react';

const PrivateLayout = () => {
  return (
    <div className='flex flex-col md:flex-row flex-no-wrap h-screen'>
      <Sidebar />
      <div className='flex w-full h-full'>
        <div className='w-full h-full  overflow-y-scroll'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PrivateLayout;
