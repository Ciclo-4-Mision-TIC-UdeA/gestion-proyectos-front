import { createContext, useContext } from 'react';

export const ObjContext = createContext(null);

export const useObj = () => {
  return useContext(ObjContext);
};
