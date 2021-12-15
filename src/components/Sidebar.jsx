import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'context/authContext';
import { useUser } from 'context/userContext';
import PrivateComponent from 'components/PrivateComponent';

const SidebarLinks = () => (
  <ul className='mt-12'>
    <SidebarRouteImagen to='/perfil' title='Perfil' icon='fas fa-user' />
    <SidebarRoute to='' title='Inicio' icon='fas fa-home' />
    <PrivateComponent roleList={['ADMINISTRADOR']}>
      <SidebarRoute to='/usuarios' title='Usuarios' icon='fas fa-user' />
    </PrivateComponent>
    <SidebarRoute to='/proyectos' title='Proyectos' icon='fas fa-smile-wink' />
    <SidebarRoute to='/avances' title='Avances' icon='fas fa-book-open' />
    <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>
      <SidebarRoute
        to='/inscripciones'
        title='Aprobacion Inscripciones'
        icon='fas fa-users'
      />
    </PrivateComponent>
    <SidebarRoute to='/page2' title='Pagina2' icon='fas fa-smile-wink' />
    <SidebarRoute to='/category1' title='Catego 1' icon='fab fa-amazon' />
    <SidebarRoute to='/category1/page1' title='Test' icon='fas fa-car' />
    <Logout />
  </ul>
);

const Logout = () => {
  const { setToken } = useAuth();
  const deleteToken = () => {
    setToken(null);
  };
  return (
    <li>
      <button type='button' onClick={() => deleteToken()}>
        <NavLink to='/auth/login' className='sidebar-route text-red-700'>
          <div className='flex items-center'>
            <i className='fas fa-sign-out-alt' />
            <span className='text-sm  ml-2'>Cerrar Sesión</span>
          </div>
        </NavLink>
      </button>
    </li>
  );
};

const Logo = () => (
  <div className='py-3 w-full flex flex-col items-center justify-center'>
    <img src='logo.png' alt='Logo' className='h-16' />
    <span className='my-2 text-xl font-bold text-center'>
      Título de Mi Aplicación
    </span>
  </div>
);

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className='flex flex-col md:flex-row flex-no-wrap md:h-full'>
      {/* Sidebar starts */}

      <div className='sidebar hidden md:flex'>
        <div className='px-8'>
          <Logo />
          <SidebarLinks />
        </div>
      </div>
      <div className='flex md:hidden w-full justify-between bg-gray-800 p-2 text-white'>
        <button type='button' onClick={() => setOpen(!open)}>
          <i className={`fas fa-${open ? 'times' : 'bars'}`} />
        </button>
        <i className='fas fa-home' />
      </div>
      {open && <ResponsiveSidebar />}
      {/* Sidebar ends */}
    </div>
  );
};

const ResponsiveSidebar = () => (
  <div>
    <div
      className='sidebar h-full z-40 absolute md:h-full sm:hidden transition duration-150 ease-in-out'
      id='mobile-nav'
    >
      <div className='px-8'>
        <Logo />
        <SidebarLinks />
      </div>
    </div>
  </div>
);

const SidebarRoute = ({ to, title, icon }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? 'sidebar-route text-white bg-indigo-700'
          : 'sidebar-route text-gray-900 hover:text-white hover:bg-indigo-400'
      }
    >
      <div className='flex items-center'>
        <i className={icon} />
        <span className='text-sm  ml-2'>{title}</span>
      </div>
    </NavLink>
  </li>
);
const SidebarRouteImagen = ({ to, title, icon }) => {
  const { userData } = useUser();
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? 'sidebar-route text-white bg-indigo-700'
            : 'sidebar-route text-gray-900 hover:text-white hover:bg-indigo-400'
        }
      >
        <div className='flex items-center'>
          {userData.foto ? (
            <img
              className='h-8 w-8 rounded-full'
              src={userData.foto}
              alt='foto'
            />
          ) : (
            <i className={icon} />
          )}
          <span className='text-sm  ml-2'>{title}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default Sidebar;
